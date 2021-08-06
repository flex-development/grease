import cache from '@grease/config/cache.config'
import {
  DEBUG_NAMESPACE,
  DEBUG_NAMESPACE_COLOR
} from '@grease/config/constants.config'
import type { ILogger } from '@grease/interfaces'
import chalk from 'chalk'
import debug from 'debug'

/**
 * @file Utility - Create Logger
 * @module grease/utils/createLogger
 */

/**
 * Creates a new logger instance.
 *
 * @see https://github.com/visionmedia/debug
 * @see https://github.com/chalk/chalk#usage
 *
 * @param {string} [namespace] - Log namespace
 * @param {string} [delimiter] - Log namespace separator. Defaults to `:`
 * @return {ILogger} New  logger
 */
const createLogger = (namespace?: string, delimiter?: string): ILogger => {
  let logger = debug(DEBUG_NAMESPACE) as ILogger

  // If namespace is non-empty string, extend base logger
  if (typeof namespace === 'string' && namespace.length) {
    logger = logger.extend(namespace, delimiter) as ILogger
  }

  // Set log color
  logger.color = DEBUG_NAMESPACE_COLOR

  /**
   * Base log function. Logs `args` if logging is enabled.
   *
   * @param {Parameters<typeof logger>} args - Log arguments
   * @return {void} Nothing when complete
   */
  const log = (...args: Parameters<typeof logger>): void => {
    if (!cache.options?.silent ?? false) logger(...args)
  }

  /**
   * Logs a message to the console in red.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  logger.error = (...text: unknown[]): void => log(chalk.red(...text))

  /**
   * Logs a message to the console in green.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  logger.success = (...text: unknown[]): void => log(chalk.green(...text))

  /**
   * Logs a message to the console in yellow.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  logger.warn = (...text: unknown[]): void => log(chalk.yellow(...text))

  /**
   * Log a message to the console.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  logger.log = (...text: unknown[]): void => log(chalk.white(...text))

  return logger
}

export default createLogger
