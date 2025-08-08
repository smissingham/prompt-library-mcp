import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { log, findMarkdownFiles } from "./utils.ts";

// Create MCP server
const server = new Server(
  {
    name:
      process.env.SERVER_NAME ??
      process.env.npm_package_name ??
      "prompt-library",
    version: process.env.npm_package_version ?? "0.0.0",
  },
  {
    capabilities: {
      prompts: {},
    },
  },
);

const promptLibPath = process.env.LIBRARY_PATH ?? "prompts";
log("Prompt Library Path" + promptLibPath);

// Get all markdown files
const markdownFiles = findMarkdownFiles(promptLibPath);
log("Discovered Markdown Contents:" + JSON.stringify(markdownFiles, null, 2));

// Register prompts handlers
server.setRequestHandler(ListPromptsRequestSchema, () => {
  const response = {
    prompts: markdownFiles.map((file) => ({
      name: file.name,
      description: `Prompt from ${file.name}`,
    })),
  };

  log("ListPromptsRequestSchema: " + JSON.stringify(response, null, 2));
  return response;
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const promptName = request.params.name;
  const file = markdownFiles.find((f) => f.name === promptName);

  if (!file) {
    throw new Error(`Prompt not found: ${promptName}`);
  }

  const content = readFileSync(file.path, "utf-8");
  const response = {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: content,
        },
      },
    ],
  };

  log("GetPromptRequestHandler: " + JSON.stringify(response, null, 2));
  return response;
});

// Create stdio transport and connect it to the server
const transport = new StdioServerTransport();
await server.connect(transport);
