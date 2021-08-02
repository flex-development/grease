/**
 * @file Enums - IsCommitMessage
 * @module grease/enums/IsCommitMessage
 */

/**
 * `IsCommit` decorator error codes mapped to error messages.
 *
 * Messages may use [special class-validator tokens][1].
 *
 * [1]: https://github.com/typestack/class-validator#validation-messages
 */
export enum IsCommitMessage {
  /**
   * Value is not commit in current repository.
   */
  DOES_NOT_EXIST = '$property must be commit in current repository'
}
