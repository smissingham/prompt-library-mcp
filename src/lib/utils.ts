import fs from "fs";
import path from "path";

export interface FileRef {
  name: string;
  path: string;
}

export enum LogMsgCat {
  INFO,
  WARNING,
  ERROR,
}

export function log(message: string, category: LogMsgCat = LogMsgCat.INFO) {
  const logFilePath: string = process.env.SERVER_LOG ?? "out/server.log";
  if (!fs.existsSync(logFilePath)) {
    return;
  }
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${category}]: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

export const isStringNullOrEmpty = (
  str: string | null | undefined,
): str is null | undefined | "" => {
  return !str || str.trim() === "";
};

// Helper function to recursively find all markdown files
export function findMarkdownFiles(
  dir: string,
  basePath: string = "",
): Array<FileRef> {
  // check whether filepath really exists, if not, log and exit
  if (!fs.existsSync(dir)) {
    log(`No markdown file found at ${dir}, exiting.`);
    return [];
  }

  const results: Array<{ name: string; path: string }> = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relativePath = basePath ? path.join(basePath, file) : file;
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      const subDirResults = findMarkdownFiles(fullPath, relativePath);
      results.push(...subDirResults);
    } else if (file.endsWith(".md")) {
      // For files in subdirectories, prefix with subdir name
      const promptName = basePath
        ? `${basePath.replace(/\//g, "-")}-${file.replace(".md", "")}`
        : file.replace(".md", "");
      results.push({
        name: promptName,
        path: fullPath,
      });
    }
  }

  return results;
}
