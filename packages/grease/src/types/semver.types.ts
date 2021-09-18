import type {
  Operator as SemVerOperator,
  Options as SemVerOptions,
  Range
} from 'semver'

/**
 * @file Type Definitions - SemVer
 * @module grease/types/semver
 */

/**
 * `IsSemVerOptions.clean` configuration.
 */
export type IsSemVerOptionsClean = [string] | [string, SemVerOptions] | []

/**
 * `IsSemVerOptions.cmp` configuration.
 */
export type IsSemVerOptionsCMP =
  | [SemVerOperator, SemanticVersion]
  | [SemVerOperator, SemanticVersion, SemVerOptions | boolean | undefined]

/**
 * `IsSemVerOptions.satisfies` configuration.
 */
export type IsSemVerOptionsConfigSatisfies =
  | [Range | string]
  | [Range | string, SemVerOptions | boolean | undefined]

/**
 * Stable semantic version string schema.
 */
export type SemanticVersionStable = `${number}.${number}.${number}`

/**
 * Unstable semantic version string schema.
 */
export type SemanticVersionUnstable =
  | `${SemanticVersionStable}-${string}`
  | `${SemanticVersionStable}-${string}.${number}`

/**
 * Semantic version (stable and unstable) string schema.
 */
export type SemanticVersion = SemanticVersionStable | SemanticVersionUnstable

/**
 * Semantic version (stable and unstable) with tag prefix string schema.
 */
export type SemanticVersionTag =
  | `${string | ''}${SemanticVersion}`
  | `${string}@${SemanticVersion}`

// Rename `git-semver-tag` and `semver` type definitions
export type {
  Callback as GitSemverTagsCallback,
  Options as GitSemverTagsOptions
} from 'git-semver-tags'
export type {
  Operator as SemVerOperator,
  Options as SemVerOptions
} from 'semver'
