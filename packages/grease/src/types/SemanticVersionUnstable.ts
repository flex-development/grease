import type { SemanticVersionStable } from './SemanticVersionStable'

/**
 * @file Type Definitions - SemanticVersionUnstable
 * @module grease/types/SemanticVersionUnstable
 */

/**
 * Unstable semantic version string schema.
 */
export type SemanticVersionUnstable =
  | `${SemanticVersionStable}-${string}`
  | `${SemanticVersionStable}-${string}.${number}`
