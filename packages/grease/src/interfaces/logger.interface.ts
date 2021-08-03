import type { Debugger } from 'debug'

/**
 * @file Interfaces - ILogger
 * @module grease/interfaces/ILogger
 */

/**
 * Custom logger that adds log-level functions to the base [`debug`][1] logger.
 *
 * [1]: https://github.com/visionmedia/debug
 *
 * @extends Debugger
 */
export interface ILogger extends Debugger {
  error: (...text: unknown[]) => void
  warn: (...text: unknown[]) => void
  success: (...text: unknown[]) => void
}
