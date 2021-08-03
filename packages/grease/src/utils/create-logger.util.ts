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

  // Add log level functions
  logger.error = (...text: unknown[]) => logger(chalk.red(...text))
  logger.success = (...text: unknown[]) => logger(chalk.green(...text))
  logger.warn = (...text: unknown[]) => logger(chalk.yellow(...text))

  return logger
}

export default createLogger
