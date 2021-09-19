import type { Options as SemVerOptions, Range } from 'semver'

/**
 * @file Type Definitions - IsSemVerOptionsSatisfies
 * @module grease/types/IsSemVerOptionsSatisfies
 */

/**
 * `IsSemVerOptions.satisfies` configuration.
 */
export type IsSemVerOptionsSatisfies =
  | [Range | string]
  | [Range | string, SemVerOptions | boolean | undefined]
