import type { IGreaseOptions } from '@grease/interfaces'
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
  checkpoint: (
    options?: IGreaseOptions,
    message?: string,
    args?: string[],
    figure?: string
  ) => void
  error: (...text: unknown[]) => void
  info: (...text: unknown[]) => void
  warn: (...text: unknown[]) => void
  success: (...text: unknown[]) => void
}
