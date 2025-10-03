# Session Management

The Claude Code SDK provides session management capabilities for handling conversation state, persistence, and resumption. This guide covers how sessions are created, managed, persisted to files, and resumed within the SDK.

## Session Architecture

The Claude Code SDK implements a file-based session management system that handles conversation persistence and state restoration.

Generate Session ID

System Init Message

SDK Loads Internally

SDK query Function Call

Session Created

Automatically

Session ID Returned

Session Files Written

~/.config/claude/

sessions/sessions.json

~/.config/claude/projects/

{hash}/{session-id}.jsonl

Session Metadata

Storage

Conversation

Transcript

Session Status

Tracking

Message History

Resume with

Session ID

Transcript Restored

Conversation

Continues

## Session File Structure

Sessions are persisted to the local filesystem in a structured format:

```
~/.config/claude/
├── sessions/
│   └── sessions.json          # Session metadata and state
└── projects/
    └── {project-hash}/
        └── {session-id}.jsonl # Session transcript
```

### Session Metadata Format

The `sessions.json` file stores metadata about all sessions:

```typescript
interface SessionMetadata {
  id: string
  name: string
  status: 'active' | 'completed' | 'interrupted'
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  projectPath: string
  transcriptPath: string
  metadata: {
    model?: string
    tools?: string[]
    lastMessageId?: string
  }
}
```

### Session Transcript Format

Session transcripts are stored as JSONL (JSON Lines) files, with each line representing a message or event:

```
{"type":"user","uuid":"abc123","timestamp":"2024-01-01T10:00:00Z","message":{"content":"Hello Claude"}}
{"type":"assistant","uuid":"def456","parentUuid":"abc123","timestamp":"2024-01-01T10:00:01Z","message":{"content":[{"type":"text","text":"Hello! How can I help?"}]}}
{"type":"checkpoint","sessionId":"session123","commit":"a1b2c3d","timestamp":"2024-01-01T10:00:02Z","label":"Initial state","id":"chk456"}
```

Each line in the JSONL file represents:

- **User messages**: Input from the user
- **Assistant messages**: Responses from Claude
- **Checkpoints**: Saved states in the conversation (e.g., after completing a task)
- **Tool use**: Records of when tools were invoked and their results

## Session Lifecycle

### Creation and Initialization

When a session starts, the SDK performs several initialization steps:

1. **Generate Session ID**: Creates a unique identifier for the session
2. **Create Project Directory**: Sets up the project-specific storage location
3. **Initialize Transcript File**: Creates an empty JSONL file for the conversation
4. **Store Initial Metadata**: Records session creation time and configuration

### Getting the Session ID

The session ID is provided in the initial system message when you start a conversation. You can capture it for later use:

```typescript
import { query } from "@anthropic-ai/claude-code"

let sessionId: string | undefined

const response = query({
  prompt: "Help me build a web application",
  options: {
    model: "claude-sonnet-4-20250514"
  }
})

for await (const message of response) {
  // The first message is a system init message with the session ID
  if (message.type === 'system' && message.subtype === 'init') {
    sessionId = message.session_id
    console.log(`Session started with ID: ${sessionId}`)
    // You can save this ID for later resumption
  }

  // Process other messages...
  console.log(message)
}

// Later, you can use the saved sessionId to resume
if (sessionId) {
  const resumedResponse = query({
    prompt: "Continue where we left off",
    options: {
      resume: sessionId
    }
  })
}
```

### Session State Persistence

The SDK automatically persists session state to disk:

- **After each message exchange**: The transcript is updated
- **On tool invocations**: Tool use and results are recorded
- **At checkpoints**: Important conversation states are marked
- **On session end**: Final state is saved

## Session Resumption

The SDK supports resuming sessions from previous conversation states, enabling continuous development workflows.

### Resume from Session Files

```typescript
import { query } from "@anthropic-ai/claude-code"

// Resume a previous session using its ID
const response = query({
  prompt: "Continue implementing the authentication system from where we left off",
  options: {
    resume: "session-xyz", // Session ID from previous conversation
    model: "claude-sonnet-4-20250514",
    allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"]
  }
})

// The conversation continues with full context from the previous session
for await (const message of response) {
  console.log(message)
}
```

## Error Handling and Recovery

### Handling Interrupted Sessions

```typescript
import { query } from '@anthropic-ai/claude-code'
import { readFile } from 'fs/promises'
import { homedir } from 'os'
import { join } from 'path'

// Check if a session was interrupted
const checkSessionStatus = async (sessionId: string) => {
  const metadataPath = join(homedir(), '.config/claude/sessions/sessions.json')
  const metadata = JSON.parse(await readFile(metadataPath, 'utf-8'))

  const session = metadata.find(s => s.id === sessionId)

  if (session?.status === 'interrupted') {
    console.log('Session was interrupted. Ready for resumption...')

    // The SDK handles loading the transcript internally
    return {
      canResume: true,
      sessionId: sessionId
    }
  }

  return { canResume: false }
}

// Resume an interrupted session
const resumeInterrupted = async (sessionId: string) => {
  const status = await checkSessionStatus(sessionId)

  if (status.canResume) {
    const response = query({
      prompt: "Let's continue from where we left off",
      options: {
        resume: status.sessionId
      }
    })

    for await (const message of response) {
      console.log(message)
    }
  }
}
```

The Claude Code SDK's session management system provides a robust foundation for maintaining conversation state and enabling seamless resumption of development tasks, all through a simple file-based approach that requires no external infrastructure.