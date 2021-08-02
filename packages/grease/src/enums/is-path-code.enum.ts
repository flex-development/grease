/**
 * @file Enums - IsPathCode
 * @module grease/enums/IsPathCode
 */

/**
 * `IsPath` decorator error codes.
 */
export enum IsPathCode {
  /**
   * Value is `string | Buffer | String | URL`, but does not exist in the file
   * system. Thrown when `IsPathOptions.exists` is `true`.
   */
  DOES_NOT_EXIST = 'DOES_NOT_EXIST',

  /**
   * Value is not `string | Buffer | String | URL`.
   */
  PATH_LIKE = 'PATH_LIKE'
}
