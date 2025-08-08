# Prompt Library MCP Server

## Current Functionality

- Provide a filepath, all markdown files will be read and served as prompts
- Nested files will prepend their folder names, with hyphens, as the prompt name
- One default meta prompt, to help create other prompts

### Prompt Library Directory Example
```
prompts/
├── my-prompt.md
├── another-prompt.md
├── ignored-file.somethingElse
└── category/
    └── specialized-prompt.md
```

## Future Features

- More default prompts
- MCP Tools for Creation & Modification of Prompts
- Prompt variable support
- Prompt frontmatter descriptors
- Live Reload of Prompts List 
    - This is already implemented by server, but probably not by clients

# Installation

Note, all env vars are optional, but at least one is required to get prompts

## Cursor
[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=prompt-library&config=JTdCJTIyY29tbWFuZCUyMiUzQSUyMm5weCUyMC15JTIwcHJvbXB0LWxpYnJhcnktbWNwJTQwbGF0ZXN0JTIyJTJDJTIyZW52JTIyJTNBJTdCJTIyTElCUkFSWV9QQVRIJTIyJTNBJTIyJTJGcGF0aCUyRnRvJTJGeW91ciUyRnN0b3JlZCUyRnByb21wdHMlMjIlMkMlMjJERUZBVUxUX1BST01QVFMlMjIlM0ElMjJmYWxzZSUyMiUyQyUyMlNFUlZFUl9OQU1FJTIyJTNBJTIyT3B0aW9uYWwlM0ElMjBPdmVyd3JpdGUlMjBNQ1AlMjBTZXJ2ZXIlMjBOYW1lJTIyJTJDJTIyU0VSVkVSX0xPRyUyMiUzQSUyMiUyRnBhdGglMkZ0byUyRmxvZyUyRmZpbGUlMkZpcyUyRm9wdGlvbmFsJTIyJTdEJTdE)


## Other MCP Client
```json
{
  "PromptLibrary": {
    "command": "npx",
    "args": [
        "-y",
        "prompt-library-mcp@latest"
    ],
    "env": {
        "LIBRARY_PATH": "/path/to/your/stored/prompts",
        "DEFAULT_PROMPTS": "false",
        "SERVER_NAME": "Optional: Overwrite MCP Server Name",
        "SERVER_LOG": "/path/to/log/file/is/optional"
    }
  }
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for development instructions.
