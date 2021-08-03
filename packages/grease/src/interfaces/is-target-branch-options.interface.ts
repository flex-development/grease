import type { IsBranchOptions } from './is-branch-options.interface'

/**
 * @file Interfaces - IsTargetBranchOptions
 * @module grease/interfaces/IsTargetBranchOptions
 */

/**
 * Validation options for the `IsTargetBranch` decorator.
 *
 * @extends IsBranchOptions
 */
export interface IsTargetBranchOptions extends IsBranchOptions {
  /**
   * Allow commit SHAs.
   */
  sha?: boolean
}
