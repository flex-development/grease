import cache from '@grease/config/cache.config'
import {
  DEBUG_NAMESPACE,
  DEBUG_NAMESPACE_COLOR
} from '@grease/config/constants.config'
import type { IGreaseOptions, ILogger } from '@grease/interfaces'
import ch from 'chalk'
import debug from 'debug'
import figures from 'figures'
import util from 'util'

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
  const logbase = (...args: Parameters<typeof logger>): void => {
    if (!cache.options?.silent ?? false) logger(...args)
  }

  /**
   * Logs a message to the console in red.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  const error = (...text: unknown[]): void => logbase(ch.red(...text))

  /**
   * Logs a message to the console in blue.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  const info = (...text: unknown[]): void => logbase(ch.blue(...text))

  /**
   * Logs a message to the console in green.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  const success = (...text: unknown[]): void => logbase(ch.green(...text))

  /**
   * Logs a message to the console in yellow.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  const warn = (...text: unknown[]): void => logbase(ch.yellow(...text))

  /**
   * Log a message to the console.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  const log = (...text: unknown[]): void => logbase(ch.white(...text))

  /**
   * Logs a library checkpoint. If `options.dryRun` is `true`, `message` will be
   * logged as warning. Otherwise, it'll be logged as a success message.
   *
   * @param {IGreaseOptions} [options={}] - Application options
   * @param {string} [msg=''] - Message to log
   * @param {string[]} [args=[]] - Additional messages
   * @param {string} [figure] - Unicode symbol
   * @return {void} Nothing when complete
   */
  const checkpoint = (
    options: IGreaseOptions = {},
    msg: string = '',
    args: string[] = [],
    figure?: string
  ): void => {
    // Get dryRun setting
    const dryRun = options?.dryRun ?? false

    // Get full message
    msg = util.format.apply([msg].concat(args.map(arg => ch.bold(arg))))

    // Log info message
    info(`${figure || ch[dryRun ? 'yellow' : 'green'](figures.tick)} ${msg}`)
  }

  // Add custom log functions
  logger.checkpoint = checkpoint
  logger.error = error
  logger.info = info
  logger.success = success
  logger.warn = warn
  logger.log = log

  return logger
}

export default createLogger
