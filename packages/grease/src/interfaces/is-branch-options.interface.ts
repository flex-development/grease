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
   * List branches in `refs/remotes/${remote}` instead of `refs/heads`.
   *
   * @default 'origin'
   */
  remote?: string
}
