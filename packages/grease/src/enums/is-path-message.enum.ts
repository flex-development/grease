/**
 * @file Enums - IsPathMessage
 * @module grease/enums/IsPathMessage
 */

/**
 * `IsPath` decorator error codes mapped to error messages.
 *
 * Messages may use [special class-validator tokens][1].
 *
 * [1]: https://github.com/typestack/class-validator#validation-messages
 */
export enum IsPathMessage {
  /**
   * Value is `string | Buffer | String | URL`, but does not exist in the file
   * system. Thrown when `IsPathOptions.exists` is `true`.
   */
  DOES_NOT_EXIST = '$property must exist in file system',

  /**
   * Value is not `string | Buffer | String | URL`.
   */
  PATH_LIKE = '$property must be PathLike: string | Buffer | String | URL'
}
