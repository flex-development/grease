/**
 * @file Models - LogObject
 * @module grease/log/models/LogObject
 */

import { LogLevel, LogType } from '#src/log/enums'
import type { InputLog } from '#src/log/interfaces'
import {
  defaults,
  fallback,
  get,
  ifelse,
  isNull,
  isString,
  uppercase,
  type Nullable
} from '@flex-development/tutils'

/**
 * Log data object model.
 *
 * @see {@linkcode InputLog}
 *
 * @template T - Log message type
 *
 * @class
 * @implements {InputLog<T>}
 */
class LogObject<T = unknown> implements InputLog<T> {
  /**
   * Format arguments.
   *
   * @see https://nodejs.org/api/util.html#utilformatformat-args
   *
   * @default []
   *
   * @public
   * @instance
   * @member {unknown[]} args
   */
  public args: unknown[]

  /**
   * Error object passed via {@linkcode message}.
   *
   * @default null
   *
   * @public
   * @instance
   * @member {Nullable<Error>} error
   */
  public error: Nullable<Error>

  /**
   * Log level.
   *
   * @see {@linkcode LogLevel}
   *
   * @default LogObject.level(type)
   *
   * @public
   * @instance
   * @member {LogLevel} level
   */
  public level: LogLevel

  /**
   * Log data or `printf`-like format string.
   *
   * @see https://nodejs.org/api/util.html#utilformatformat-args
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {T} message
   */
  public message: T

  /**
   * Logger tag.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {Nullable<string>} tag
   */
  public tag: Nullable<string>

  /**
   * Log type.
   *
   * @see {@linkcode LogType}
   *
   * @default LogType.LOG
   *
   * @public
   * @instance
   * @member {LogType} type
   */
  public type: LogType

  /**
   * Create a new log object.
   *
   * @see {@linkcode InputLog}
   *
   * @param {InputLog | string} input - Log input
   */
  constructor(input: InputLog | string) {
    const {
      args,
      level,
      message,
      tag,
      type
    } = defaults(fallback(input, { message: <string>input }, isString), {
      args: [],
      level: undefined,
      message: '',
      tag: '',
      type: LogType.LOG
    })

    this.args = [...args]
    this.error = ifelse(message instanceof Error, <Error>message, null)
    this.message = <T>fallback(get(this.error, 'message'), message, isNull)
    this.tag = tag
    this.type = LogType[uppercase(type)]

    if (this.type === LogType.TRACE && !this.error) {
      this.error = new Error(this.type, { cause: 'trace' })
      Error.captureStackTrace(this.error, LogObject)
    }

    this.level = fallback(level, LogObject.level(this.type))
  }

  /**
   * Get a log level by log type.
   *
   * @see {@linkcode LogLevel}
   * @see {@linkcode LogType}
   *
   * @public
   * @static
   *
   * @param {LogType} type - Log type
   * @return {LogLevel} Log level
   */
  public static level(type: LogType): LogLevel {
    /**
     * Log level.
     *
     * @var {LogLevel} level
     */
    let level: LogLevel

    // get log level
    switch (type) {
      case LogType.DEBUG:
        level = LogLevel.DEBUG
        break
      case LogType.ERROR:
      case LogType.FAIL:
        level = LogLevel.ERROR
        break
      case LogType.FATAL:
        level = LogLevel.FATAL
        break
      case LogType.INFO:
      case LogType.START:
      case LogType.SUCCESS:
        level = LogLevel.INFO
        break
      case LogType.LOG:
        level = LogLevel.LOG
        break
      case LogType.TRACE:
        level = LogLevel.TRACE
        break
      case LogType.VERBOSE:
        level = LogLevel.VERBOSE
        break
      case LogType.WARN:
        level = LogLevel.WARN
        break
    }

    return level
  }
}

export default LogObject
