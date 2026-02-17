/// <reference types='vitest/globals' />

namespace NodeJS {
  interface ProcessEnv extends Dict<string> {
    VITEST_ENVIRONMENT?: 'edge-runtime' | 'node'
  }
}
