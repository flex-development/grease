import type {
  GitSemverTagsOptions,
  IsSemVerOptionsClean,
  IsSemVerOptionsCMP,
  IsSemVerOptionsConfigSatisfies
} from '@grease/types'
import type { ValidationOptions } from 'class-validator'
import type { CoerceOptions } from 'semver'

/**
 * @file Interfaces - IsSemVerOptions
 * @module grease/interfaces/IsSemVerOptions
 */

/**
 * Validation options for the `IsSemVer` decorator.
 *
 * @extends ValidationOptions
 */
export interface IsSemVerOptions extends ValidationOptions {
  /**
   * Remove tag prefix and any leading or trailing whitespaces from $value.
   */
  clean?: IsSemVerOptionsClean | boolean

  /**
   * Compare $value to another semantic version.
   */
  cmp?: IsSemVerOptionsCMP | []

  /**
   * Coerce $value to a semantic version if possible.
   */
  coerce?: CoerceOptions | boolean

  /**
   * Check if $value is a semantic version tag pushed to the current repository.
   */
  git?: GitSemverTagsOptions | (() => GitSemverTagsOptions) | boolean

  /**
   * Check if $value is a semantic version tag, but **not** pushed to the
   * current repository. Use `git` to configure tag search.
   */
  negit?: boolean

  /**
   * Check if $value satisfies specified range.
   */
  satisfies?: IsSemVerOptionsConfigSatisfies | []
}
