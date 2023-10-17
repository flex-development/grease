/**
 * @file Interfaces - InputLog
 * @module grease/log/interfaces/InputLog
 */

import type { LogLevel, LogType } from '#src/log/enums'
import type { Nilable } from '@flex-development/tutils'

/**
 * Log data transfer object.
 *
 * @template T - Log message type
 */
interface InputLog<T = unknown> {
  /**
   * Format arguments.
   *
   * @see https://nodejs.org/api/util.html#utilformatformat-args
   *
   * @default []
   */
  args?: readonly any[]

  /**
   * Log level.
   *
   * @default LogObject.level(log.type)
   */
  level?: LogLevel

  /**
   * Log data or `printf`-like format string.
   *
   * @see https://nodejs.org/api/util.html#utilformatformat-args
   */
  message: T

  /**
   * Logger tag.
   *
   * @default null
   */
  tag?: Nilable<string>

  /**
   * Log type.
   *
   * @see {@linkcode LogType}
   *
   * @default LogType.LOG
   */
  type?: LogType | keyof typeof LogType
}

export type { InputLog as default }
