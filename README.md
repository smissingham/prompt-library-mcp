# Prompt Library MCP Server

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D5.0-blue)
![Bun](https://img.shields.io/badge/bun-%3E=1.0-orange)

A Model Context Protocol (MCP) server that serves prompts from a local markdown file library, enabling AI tools to access and utilize standardized prompts.

## Features

- Serves prompts stored as markdown files
- Supports nested directory organization for prompts
- Integrates with MCP-compatible tools and applications
- Simple file-based prompt management
- Real-time prompt discovery and retrieval

## Installation

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- Node.js and npm (for development)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd prompt-library-mcp
```

2. Install dependencies:
```bash
bun install
```

## Usage

### Running the Server

To start the server in production mode:
```bash
bun start
```

To run in development mode with file watching:
```bash
bun dev
```

### Adding Prompts

Add your prompts as markdown files in the `prompts/` directory:
```
prompts/
├── my-prompt.md
├── another-prompt.md
└── category/
    └── specialized-prompt.md
```

Each markdown file should contain the prompt content in plain text. The filename (without extension) becomes the prompt name when querying via MCP.

### Environment Variables

- `LIBRARY_PATH`: Path to the prompts directory (default: "prompts")
- `SERVER_LOG`: Path to log file (default: "server.log")
- `SERVER_NAME`: Server name identifier (default: "prompt-library")

## API

The server implements the Model Context Protocol and responds to:

- `prompts/list`: Lists available prompts
- `prompts/get`: Retrieves a specific prompt by name

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Model Context Protocol SDK](https://github.com/modelcontextprotocol/sdk)

