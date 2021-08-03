/**
 * @file Enums - ExitCode
 * @module grease/enums/ExitCode
 */

/**
 * Bash [exit codes][1] used in this application.
 *
 * [1]: https://tldp.org/LDP/abs/html/exitcodes.html
 */
export enum ExitCode {
  /**
   * Successfully executed code.
   */
  SUCCESS = 0,

  /**
   * Catch all for all errors.
   *
   * @example let "var1 = 1/0"
   */
  GENERAL = 1,

  /**
   * "command not found".
   *
   * @example illegal_command
   */
  NOT_FOUND = 127
}
