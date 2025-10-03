# Claude Code SDK TypeScript Reference

## Overview

The Claude Code SDK provides a TypeScript interface for interacting with Claude's AI development tools. This reference covers the core functions, types, and interfaces for building AI-powered applications.

## Installation

While specific installation instructions aren't provided in the source, typically you would install via npm or yarn:

```bash
npm install @anthropic/claude-code-sdk
```

## Core Functions

### `query()`

The primary function for interacting with Claude Code.

```typescript
function query({
  prompt,
  options
}: {
  prompt: string | AsyncIterable<SDKUserMessage>;
  options?: Options;
}): Query
```

#### Parameters
- `prompt`: User input as a string or async iterable
- `options`: Optional configuration object

### `tool()`

Creates a type-safe MCP tool definition:

```typescript
function tool<Schema extends ZodRawShape>(
  name: string,
  description: string,
  inputSchema: Schema,
  handler: (args: z.infer<ZodObject<Schema>>, extra: unknown) => Promise<CallToolResult>
): SdkMcpToolDefinition<Schema>
```

### `createSdkMcpServer()`

Creates an MCP server instance:

```typescript
function createSdkMcpServer(options: {
  name: string;
  version?: string;
  tools?: Array<SdkMcpToolDefinition<any>>;
}): McpSdkServerConfigWithInstance
```

## Key Types and Interfaces

### Permission Modes

```typescript
type PermissionMode =
  | 'default'           // Standard permission behavior
  | 'acceptEdits'       // Auto-accept file edits
  | 'bypassPermissions' // Bypass all permission checks
  | 'plan'              // Planning mode - no execution
```

### Hook Events

```typescript
type HookEvent =
  | 'PreToolUse'
  | 'PostToolUse'
  | 'Notification'
```

### Options Interface

```typescript
interface Options {
  permissionMode?: PermissionMode;
  hooks?: Record<HookEvent, string>;
  // Additional configuration options
}
```

### Query Interface

The `Query` interface provides methods for handling the AI interaction:

```typescript
interface Query {
  // Methods for processing and handling responses
  // Implementation details depend on specific use case
}
```

### SDKUserMessage

```typescript
interface SDKUserMessage {
  // Message structure for user input
  // Used when providing async iterable prompts
}
```

### Tool Definition Types

```typescript
interface SdkMcpToolDefinition<Schema extends ZodRawShape> {
  name: string;
  description: string;
  inputSchema: Schema;
  handler: (args: z.infer<ZodObject<Schema>>, extra: unknown) => Promise<CallToolResult>;
}

interface CallToolResult {
  // Result structure returned by tool handlers
  // Specific format depends on tool implementation
}
```

### MCP Server Configuration

```typescript
interface McpSdkServerConfigWithInstance {
  name: string;
  version?: string;
  tools?: Array<SdkMcpToolDefinition<any>>;
  // Additional server configuration and instance methods
}
```

## Usage Patterns

### Basic Query Example

```typescript
import { query } from '@anthropic/claude-code-sdk';

const result = query({
  prompt: "Help me write a TypeScript function",
  options: {
    permissionMode: 'default'
  }
});
```

### Creating Tools

```typescript
import { tool } from '@anthropic/claude-code-sdk';
import { z } from 'zod';

const myTool = tool(
  'calculate',
  'Performs mathematical calculations',
  {
    operation: z.string(),
    numbers: z.array(z.number())
  },
  async (args, extra) => {
    // Tool implementation
    return {
      // Return calculation result
    };
  }
);
```

### Setting Up MCP Server

```typescript
import { createSdkMcpServer, tool } from '@anthropic/claude-code-sdk';

const server = createSdkMcpServer({
  name: 'my-claude-server',
  version: '1.0.0',
  tools: [myTool]
});
```

## Notes

This documentation is based on the available TypeScript SDK reference. For the most up-to-date information and complete API details, refer to the official Claude Code documentation at https://docs.claude.com/en/docs/claude-code/sdk/sdk-typescript.

The SDK appears to focus on:
- Type-safe interactions with Claude AI
- MCP (Model Context Protocol) server creation
- Tool definition and management
- Flexible permission and execution modes
- Hook-based event handling