import type {
  GetPromptResult,
  Prompt,
} from "@modelcontextprotocol/sdk/types.js";
import {
  FileRef,
  findMarkdownFiles,
  isStringNullOrEmpty,
  log,
  LogMsgCat,
} from "../lib/utils";

import fs from "node:fs";
import path from "node:path";

class PromptFileRef implements FileRef {
  name: string;
  path: string;

  constructor(file: FileRef) {
    this.name = file.name;
    this.path = file.path;
  }

  getPrompt(): Prompt {
    return {
      // TODO: override with frontmatter
      name: this.name,
      // TODO: get this from frontmatter
      description: `Prompt loaded from ${this.path}`,
    };
  }

  async getPromptResult(): Promise<GetPromptResult> {
    return {
      messages: [
        {
          // TODO: Multi message support?
          // TODO: Role in frontmatter?
          role: "user",
          content: {
            type: "text",
            // TODO: detect encoding?
            text: await fs.promises.readFile(this.path, "utf-8"),
          },
        },
      ],
    };
  }
}

// TODO: Implement live cache and fs watcher, store as hashmap
// note, only necessary if an MCP client implements live relist/refetch
async function getPromptRefs(): Promise<PromptFileRef[]> {
  const defaultPromptsDirName = "default_prompts";
  // look for default prompts folder, it can be in different relative locations depending on env
  let defaultPromptsDir;
  for (const dir of ["", "./", "../", "../../"]) {
    const checkPath = path.join(__dirname, dir + defaultPromptsDirName);
    if (fs.existsSync(checkPath)) {
      defaultPromptsDir = checkPath;
      break;
    }
  }

  const userPromptsDir = process.env.LIBRARY_PATH ?? "";

  let mdFiles: FileRef[] = [];

  const defaultsEnabled = process.env.DEFAULT_PROMPTS === "true";
  if (defaultsEnabled && defaultPromptsDir !== undefined)
    mdFiles.push(...findMarkdownFiles(defaultPromptsDir));

  if (!isStringNullOrEmpty(userPromptsDir))
    mdFiles.push(...findMarkdownFiles(userPromptsDir));

  log(
    JSON.stringify(
      {
        defaultsEnabled: defaultsEnabled,
        defaultPromptsDir: defaultPromptsDir,
        defaults: findMarkdownFiles(defaultPromptsDir),
        userFiles: findMarkdownFiles(userPromptsDir),
      },
      null,
      2,
    ),
  );
  return mdFiles.map((x) => new PromptFileRef(x));
}

export async function listPrompts() {
  log("Listing Prompts");
  const promptRefs = await getPromptRefs();
  return {
    prompts: promptRefs.map((x) => x.getPrompt()),
  };
}

export async function getPrompt(name: string): Promise<GetPromptResult> {
  log(`Fetching Prompt by Name: ${name}`);
  const promptRefs = await getPromptRefs();
  const promptFile = promptRefs.find((x) => x.name === name);

  if (promptFile === undefined) {
    const errorMessage = `Couldn't find prompt file for name ${name}`;
    log(errorMessage, LogMsgCat.ERROR);
    throw new Error(errorMessage);
  }

  return promptFile.getPromptResult();
}
