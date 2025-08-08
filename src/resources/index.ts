import type { Resource } from "@modelcontextprotocol/sdk/types.js";

export const resources: Resource[] = [];

export const resourceHandlers = {} as const;

// Pattern-based handler for advanced config URIs
export function getResourceHandler(uri: string) {
  return null;
}
