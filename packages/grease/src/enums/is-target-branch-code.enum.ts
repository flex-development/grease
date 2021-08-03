/**
 * @file Enums - IsTargetBranchCode
 * @module grease/enums/IsTargetBranchCode
 */

/**
 * `IsTargetBranch` decorator error codes.
 */
export enum IsTargetBranchCode {
  /**
   * Value is a non-empty string, but is not a branch or commit SHA in the
   * current repository.
   */
  DOES_NOT_EXIST = 'DOES_NOT_EXIST'
}
