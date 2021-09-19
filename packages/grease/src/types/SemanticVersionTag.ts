import type { SemanticVersion } from './SemanticVersion'

/**
 * @file Type Definitions - SemanticVersionTag
 * @module grease/types/SemanticVersionTag
 */

/**
 * Semantic version (stable and unstable) with tag prefix string schema.
 */
export type SemanticVersionTag =
  | `${string | ''}${SemanticVersion}`
  | `${string}@${SemanticVersion}`
