import { LogLevel } from '@grease/enums/log-level.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import ch from 'chalk'
import figures from 'figures'
import checkpoint from 'standard-version/lib/checkpoint'

/**
 * @file Utilities - log
 * @module grease/utils/log
 */

/**
 * Application logger.
 *
 * @param {IGreaseOptions} options - Application options
 * @param {string} message - Message to log
 * @param {any[]} [args=[]] - Additional messages
 * @param {keyof typeof LogLevel} [level='success'] - Log level
 * @param {boolean} [bold=false] - Bold message
 * @return {void} Nothing when complete
 */
const log = (
  options: IGreaseOptions,
  message: string,
  args: any[] = [],
  level: keyof typeof LogLevel = 'success',
  bold: boolean = false
): void => {
  let figure: keyof typeof figures | string = ''

  if (level === 'error') figure = 'cross'
  if (level === 'info') figure = level
  if (level === 'success') figure = 'tick'
  if (level === 'warning') figure = '!'

  return checkpoint(
    options,
    ch.white(bold ? ch.bold(message) : message),
    args,
    ch.bold[LogLevel[level]](figures[figure] || figure)
  )
}

export default log
