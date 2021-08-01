/**
 * @file Enums - IsBranchMessage
 * @module grease/enums/IsBranchMessage
 */

/**
 * `IsBranch` decorator error codes mapped to error messages.
 *
 * Messages may use [special class-validator tokens][1].
 *
 * [1]: https://github.com/typestack/class-validator#validation-messages
 */
export enum IsBranchMessage {
  /**
   * Value is not local branch in current repository.
   */
  LOCAL = '$property must be local branch in current repository',

  /**
   * Value is not remote branch in current repository.
   */
  REMOTE = '$property must be remote branch in current repository'
}
