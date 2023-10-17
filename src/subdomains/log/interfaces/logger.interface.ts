/**
 * @file Interfaces - ILogger
 * @module grease/log/interfaces/ILogger
 */

import type { LogLevel } from '#src/log/enums'
import type { LoggerOptions } from '#src/log/options'
import type { Colors } from '#src/log/types'

/**
 * Logger object interface.
 */
interface ILogger {
  /**
   * Color functions map.
   *
   * @see {@linkcode Colors}
   */
  colors: Colors

  /**
   * Write a `debug` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  debug(message: unknown, ...args: any[]): void

  /**
   * Write an `error` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  error(message: unknown, ...args: any[]): void

  /**
   * Write a failure log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  fail(message: unknown, ...args: any[]): void

  /**
   * Write a `fatal` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  fatal(message: unknown, ...args: any[]): void

  /**
   * Write an `info` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  info(message: unknown, ...args: any[]): void

  /**
   * Current log level.
   *
   * @see {@linkcode LogLevel}
   */
  level: LogLevel

  /**
   * Write a `log` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  log(message: unknown, ...args: any[]): void

  /**
   * Logger options.
   *
   * @see {@linkcode LoggerOptions}
   */
  options: LoggerOptions

  /**
   * Write a `start` log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  start(message: unknown, ...args: any[]): void

  /**
   * Write a `success` log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  success(message: unknown, ...args: any[]): void

  /**
   * Write a `trace` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  trace(message: unknown, ...args: any[]): void

  /**
   * Write a `verbose` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  verbose(message: unknown, ...args: any[]): void

  /**
   * Write a `warn` level log.
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  warn(message: unknown, ...args: any[]): void

  /**
   * Get a child logger.
   *
   * @param {string} tag - Child logger tag
   * @return {ILogger} Tagged child logger
   */
  withTag(tag: string): ILogger
}

export type { ILogger as default }
