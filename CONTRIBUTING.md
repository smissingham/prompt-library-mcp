# Contributing

The project is split up into a directory structure that matches the MCP assets:
- `index.ts` - Root entrypoint of project
- `prompts/` - Common prompts for reuse
  - `index.ts` - Root handler for all prompts
  - `other_prompts.ts`
- `resources/` - Read-Only resources that do not mutate any state
  - `index.ts` - Root handler for all resources
  - `other_resources.ts`
- `tools/` - Like resources, but that have effects like mutation of state
  - `index.ts` - Root handler for all tools
  - `other_tools.ts`

# Building

There is a nix flake in the root project directory with all dependencies.
If you use nix, you should only need to run the build command from that nix shell:
`pnpm build`

# Installing

Once you've built the MCP server, you can install it into your MCP client with the following json:

## Development Mode

If you have all required binaries in your PATH, you can directly call the dev server like so:
```json
{
  "prompt_lib_dev": {
    "disabled": true,
    "args": [
      "--cwd",
      "/path/to/project/root",
      "dev"
    ],
    "env": {
      "SERVER_NAME": "plib_live",
      "DEFAULT_PROMPTS": "true",
      "SERVER_LOG": "/path/to/server.log",
      "LIBRARY_PATH": "/path/to/hosted/library"
    },
    "command": "bun"
  }
}
```

## Build Distribution

After executing `bun dist`, you can then use the built files to test the built server:
```json
{
  "prompt_lib_dist": {
    "disabled": true,
    "args": [
      "/path/to/project/dist/index.js"
    ],
    "env": {
      "SERVER_NAME": "plib_live",
      "DEFAULT_PROMPTS": "true",
      "SERVER_LOG": "/path/to/server.log",
      "LIBRARY_PATH": "/path/to/hosted/library"
    },
    "command": "node"
  }
}
```
