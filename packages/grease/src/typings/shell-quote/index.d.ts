declare module 'shell-quote' {
  /**
   * Environment variable lookup function.
   */
  export type EnvFn = (key: string) => Record<string, string> | string

  /**
   * Object with environment variables.
   */
  export type EnvObject = Record<string, string>

  /**
   * Typically, `env` is an object, but it can also be a lookup function.
   *
   * When `env(key)` returns a string, the output is identical to `env[key]`.
   *
   * If an object is returned, an object will be inserted into the resulting
   * array (like an `OperatorObject`).
   */
  export type Env = EnvFn | EnvObject

  /**
   * Object representing a parsed shell operator.
   */
  export type OperatorObject = Record<'op', string>

  /**
   * Shell command parsing options.
   */
  export type ParseOptions = {
    escape?: string
  }

  /**
   * Array containing parsed shell commands and/or operator objects.
   */
  export type ParsedShellCommand = string[] | (OperatorObject | string)[]

  /**
   * Return an array of arguments from the quoted string `cmd`.
   *
   *
   * Interpolate embedded bash-style `$VARNAME` and `${VARNAME}` variables with
   * the `env` object which, like bash, will replace `undefined` variables with
   * `""`.
   *
   * Typically, `env` is an object, but it can also be a lookup function.
   *
   * When `env(key)` returns a string, the output is identical to `env[key]`.
   *
   * If an object is returned, an object will be inserted into the resulting
   * array (like an `OperatorObject`).
   *
   * When a bash operator is encountered, the element in the array with be an
   * object with an `'op'` key set to the operator string.
   *
   * @example
   *  parse('a "b c" \\$def \'it\\\'s great\'')
   *  // ['a', 'b c', '\\$def', 'it\'s great']
   * @example
   *  parse('beep --boop="$PWD"', { PWD: '/home/robot' })
   *  // ['beep', '--boop=/home/robot']
   * @example
   *  parse('beep > boop # > kaboom')
   *  // ['beep', { op: '>' }, 'boop', { comment: '> kaboom' }]
   *
   * @param {string} cmd - Shell command to parse
   * @param {Env} [env={}] - Environment variables object or lookup function
   * @param {ParseOptions} [opts={escape:'\\'}] - Shell command parsing options
   * @param {string} [opts.escape='\\'] - Custom escape character
   * @return {ParsedShellCommand} Parsed shell commands and/or operator objects
   */
  export const parse: (
    cmd: string,
    env?: Env,
    opts?: ParseOptions
  ) => ParsedShellCommand

  /**
   * Converts `args` into a quoted string suitable for using in shell commands.
   *
   * @param {string[]} args -  List of string arguments (shell command as array)
   * @return {string} Quoted string suitable for using in shell commands
   */
  export const quote: (args: string[]) => string
}
