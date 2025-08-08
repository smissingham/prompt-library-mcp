#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tools } from "./tools/index";
import * as prompts from "./prompts/index";
import { resources } from "./resources/index";
import { log } from "./lib/utils";

log("Starting Prompt Library Server");
const server = new Server(
  {
    name: process.env.npm_package_name ?? "unknown-mcp-server",
    version: process.env.npm_package_version ?? "0.0.0",
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
      resources: {},
    },
  },
);

log("Registering ListPrompts Handler");
server.setRequestHandler(ListPromptsRequestSchema, prompts.listPrompts);

log("Registering GetPrompt Handler");
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  try {
    return prompts.getPrompt(request.params.name);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

log("Registering ListResources Handler");
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return { resources };
});

log("Registering ReadResource Handler");
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { name } = request.params;

  try {
    // No resources currently implemented - all functionality moved to resources
    throw new Error(`Unknown resource: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

log("Registering ListTools Handler");
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

log("Registering CallTool Handler");
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  try {
    // No tools currently implemented - all functionality moved to resources
    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

log("Registering Main Function");
async function main() {
  log("Starting Server...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

log("Server Running");
