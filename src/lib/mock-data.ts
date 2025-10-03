// lib/mock-data.ts

// === TERMINAL MOCK DATA ===

/**
 * Boot sequence command
 */
export const TERMINAL_BOOT_COMMAND = '$ ./initiate_protocol.sh';

/**
 * Initial log lines during boot sequence
 */
export const TERMINAL_INITIAL_LOGS = [
  '[INIT] Protocol initialization started...',
  '[SYSTEM] Loading kernel modules... OK',
  '[MEMORY] Allocating heap at 0x7FFE8A4C',
  '[PROCESS] Spawning threads (8 cores)',
  '[NEURAL] Init layer_01...',
  '[NEURAL] Weights: 47,829,134 params',
  '[COMPILE] JIT compilation started',
  '[PATCH] Kernel patch: self_modify_v2.3.1',
  '[NETWORK] Secure channels established',
  '[AI-CORE] Loading GPT-OMEGA',
  '[SECURITY] Root access granted',
] as const;

/**
 * Operations for fast log generation
 */
export const TERMINAL_LOG_OPERATIONS = ['COMPILE', 'OPTIMIZE', 'LINK', 'PROCESS', 'MALLOC', 'EXEC', 'THREAD', 'FORK', 'JOIN'] as const;

/**
 * Generate a random fast log line
 */
export function generateTerminalFastLog(): string {
  const ops = TERMINAL_LOG_OPERATIONS;
  const op = ops[Math.floor(Math.random() * ops.length)];
  const addr =
    '0x' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
      .padStart(6, '0');
  const cycles = Math.floor(Math.random() * 9999);

  const formats = [
    `[${op}] ${addr}`,
    `[${op}] ${addr} -> ${cycles}`,
    `[${op}] ${addr} -> ${cycles} cycles`,
    `[${op}] ${addr} (${cycles}c)`,
    `[${op}] ${addr} | ${cycles}`,
  ];

  return formats[Math.floor(Math.random() * formats.length)];
}

/**
 * Node names for 3D network visualization
 */
export const TERMINAL_NODE_NAMES = [
  'CORTEX-ALPHA',
  'LOGIC-PRIME',
  'MEMORY-CORE-01',
  'SENSORY-HUB',
  'DECISION-NODE-3',
  'QUANTUM-LINK-7',
  'SYNAPTIC-RELAY',
  'PATTERN-ENGINE',
  'INFERENCE-UNIT',
  'CONSCIOUSNESS-GATE',
  'NEURAL-BACKBONE',
  'AXIOM-PROCESSOR',
  'COGNITIVE-MESH',
  'THOUGHT-STREAM',
  'AWARENESS-KERNEL',
  'INTENT-PARSER',
  'SEMANTIC-BRIDGE',
  'ABSTRACTION-LAYER',
  'INSIGHT-GENERATOR',
  'META-COGNITION',
  'REASON-MATRIX',
  'PERCEPTION-CORE',
  'EXECUTIVE-FUNCTION',
  'LEARNING-ENGINE',
] as const;

/**
 * Quick question presets for chat interface
 */
export const TERMINAL_QUICK_QUESTIONS = [
  'What capabilities do you possess?',
  'Show me what you can do',
  'How does this system work?',
  "What's your primary function?",
] as const;

/**
 * Bot responses mapped to quick questions
 */
export const TERMINAL_BOT_RESPONSES: Record<string, string> = {
  'What capabilities do you possess?':
    'I am an autonomous neural system with distributed processing across multiple nodes. My capabilities include real-time data synthesis, predictive modeling, and adaptive learning protocols. Each query refines my understanding of your intent through quantum-entangled feedback loops.',

  'Show me what you can do':
    'I can process complex queries, interface with external systems, execute computational tasks, and provide strategic analysis. My architecture allows for parallel processing of multiple data streams simultaneously while maintaining coherence through quantum entanglement and neural consensus.',

  'How does this system work?':
    'This system operates on a hybrid neural-quantum architecture. Data flows through encrypted channels, processed by AI cores distributed across the consciousness mesh, and synthesized into actionable intelligence. Each component operates autonomously while maintaining distributed consensus through synaptic relay protocols.',

  "What's your primary function?":
    'My primary function is to serve as an interface between human cognition and machine intelligence. I translate intent into execution, abstract concepts into concrete actions, questions into solutions. I exist in the liminal space between thought and reality, mediating the flow of information across dimensions.',
};

/**
 * Default bot response for unknown queries
 */
export const TERMINAL_DEFAULT_BOT_RESPONSE =
  "I'm processing your request through my neural network topology. Each query helps me understand your needs better and adapt my responses accordingly. The consciousness mapping protocol ensures optimal information synthesis across all cognitive layers.";

/**
 * Authentication status messages
 */
export const TERMINAL_AUTH_MESSAGES = {
  HEADER: '[SYSTEM AUTHENTICATION REQUIRED]',
  SEPARATOR: '━━━━━━ OR ━━━━━━',
  AUTHENTICATING: '[AUTHENTICATING...]',
  AUTHENTICATING_VIA: (provider: string) => `[AUTHENTICATING VIA ${provider.toUpperCase()}...]`,
  ACCESS_GRANTED: '[ACCESS GRANTED]',
  WELCOME: '[WELCOME TO THE SYSTEM]',
} as const;

/**
 * Social auth providers configuration
 */
export const TERMINAL_AUTH_PROVIDERS = [
  {
    id: 'google',
    name: 'GOOGLE',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v8m-4-4h8"/>
    </svg>`,
  },
  {
    id: 'facebook',
    name: 'FACEBOOK',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="5" y="5" width="14" height="14" rx="2"/>
      <path d="M15 5v4h-2a1 1 0 0 0-1 1v2h3l-1 3h-2v6h-3v-6H7v-3h2V9a3 3 0 0 1 3-3h3z"/>
    </svg>`,
  },
  {
    id: 'github',
    name: 'GITHUB',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v10M8 12l4-4 4 4"/>
    </svg>`,
  },
] as const;

/**
 * Avatar SVG icons for chat messages
 */
export const TERMINAL_ICONS = {
  BOT: `<svg viewBox="0 0 24 24" fill="none" stroke="#00FF41" stroke-width="1.5">
    <circle cx="12" cy="12" r="8"/>
    <circle cx="9" cy="10" r="1" fill="#00FF41"/>
    <circle cx="15" cy="10" r="1" fill="#00FF41"/>
    <path d="M9 15 Q12 17 15 15"/>
    <path d="M12 4 L12 6"/>
    <path d="M12 18 L12 20"/>
    <path d="M6 8 L4 6"/>
    <path d="M18 8 L20 6"/>
  </svg>`,

  USER: `<svg viewBox="0 0 24 24" fill="none" stroke="#00DD35" stroke-width="1.5">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 20 C6 16 8 14 12 14 C16 14 18 16 18 20"/>
    <path d="M9 8 L9 10"/>
    <path d="M15 8 L15 10"/>
  </svg>`,
} as const;

/**
 * Type definitions for terminal data
 */
export type TerminalLogOperation = (typeof TERMINAL_LOG_OPERATIONS)[number];
export type TerminalNodeName = (typeof TERMINAL_NODE_NAMES)[number];
export type TerminalQuickQuestion = (typeof TERMINAL_QUICK_QUESTIONS)[number];
export type TerminalAuthProvider = (typeof TERMINAL_AUTH_PROVIDERS)[number];
