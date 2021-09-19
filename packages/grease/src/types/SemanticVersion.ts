import type { SemanticVersionStable } from './SemanticVersionStable'
import type { SemanticVersionUnstable } from './SemanticVersionUnstable'

/**
 * @file Type Definitions - SemanticVersion
 * @module grease/types/SemanticVersion
 */

/**
 * Semantic version (stable and unstable) string schema.
 */
export type SemanticVersion = SemanticVersionStable | SemanticVersionUnstable
