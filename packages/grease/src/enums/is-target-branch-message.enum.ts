/**
 * @file Enums - IsTargetBranchMessage
 * @module grease/enums/IsTargetBranchMessage
 */

/**
 * `IsTargetBranch` decorator error codes mapped to error messages.
 *
 * Messages may use [special class-validator tokens][1].
 *
 * [1]: https://github.com/typestack/class-validator#validation-messages
 */
export enum IsTargetBranchMessage {
  /**
   * Value is a non-empty string, but is not the name of a remote branch or
   * commit SHA in the current repository.
   */
  DOES_NOT_EXIST = '$property must be git commit sha or name of remote branch'
}
