import fs from "fs";
import path from "path";

export function log(
  message: string,
  logFilePath: string = process.env.SERVER_LOG ?? "server.log",
) {
  if (!fs.existsSync(logFilePath)) {
    return;
  }
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
}

// Helper function to recursively find all markdown files
export function findMarkdownFiles(
  dir: string,
  basePath: string = "",
): Array<{ name: string; path: string }> {
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
