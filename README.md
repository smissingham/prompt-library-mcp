# Prompt Library MCP

A Model Context Protocol server that serves prompts from a directory of markdown files.

## Usage

To use this server, you can either:

1. Place your markdown prompt files in a `prompts` directory alongside the server script
2. Set the `PROMPT_LIBRARY_DIR` environment variable to point to your prompts directory

Example with environment variable:
```bash
PROMPT_LIBRARY_DIR=/path/to/your/prompts bun start
```

## Prompt Organization

The server will recursively search for all `.md` files in the prompts directory and its subdirectories. Prompts in subdirectories will be named with the pattern `subdirectory-name` where slashes are replaced with hyphens.

## Requirements

- Bun runtime
- Node.js compatible environment

## Installation

```bash
bun install
```

## Running the Server

```bash
bun start
```