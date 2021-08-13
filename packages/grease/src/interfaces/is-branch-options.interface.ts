import type { ValidationOptions } from 'class-validator'

/**
 * @file Interfaces - IsBranchOptions
 * @module interfaces/IsBranchOptions
 */

/**
 * Validation options for the `IsBranch` decorator.
 *
 * @extends ValidationOptions
 */
export interface IsBranchOptions extends ValidationOptions {
  /**
   * `.git` directory.
   *
   * @default process.env.PWD
   */
  dir?: string

  /**
   * List branches in `refs/remotes/${remote}` instead of `refs/heads`.
   */
  remote?: string
}
