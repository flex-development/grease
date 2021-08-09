import type { IGreaseCache, ILogger } from '@grease/interfaces'
import ch from 'chalk'
import figures from 'figures'
import checkpoint from 'standard-version/lib/checkpoint'
import { Service } from 'typedi'
import u from 'util'
import GreaseCache from './grease-cache.service'

/**
 * @file Services - Logger
 * @module grease/services/Logger
 */

/**
 * Logging service.
 *
 * @see https://github.com/chalk/chalk#usage
 *
 * @class
 * @implements {ILogger}
 */
@Service()
export default class Logger implements ILogger {
  /**
   * @static
   * @property {string} NAMESPACE - Logger namespace
   */
  static NAMESPACE: string = 'grease'

  /**
   * @property {IGreaseCache} cache - Application cache
   */
  readonly cache: IGreaseCache

  /**
   * @readonly
   * @property {typeof ch} ch - `chalk` module
   */
  readonly ch: typeof ch = ch

  /**
   * Creates a new logger.
   *
   * @param {GreaseCache} cache - Application cache
   */
  constructor(cache: GreaseCache) {
    this.cache = cache
  }

  /**
   * Logs a library checkpoint.
   *
   * @param {string} [msg=''] - Message to log
   * @param {any[]} [args=[]] - Additional messages
   * @param {keyof typeof figures | string} [figure='tick'] - Unicode symbol
   * @return {void} Nothing when complete
   */
  checkpoint(
    msg: string = '',
    args: any[] = [],
    figure: keyof typeof figures | string = 'tick'
  ): void {
    return checkpoint(this.cache.options, msg, args, figures[figure] || figure)
  }

  /**
   * Base log function. Logs `args` if logging is enabled.
   *
   * @param {any[]} args - Log arguments
   * @return {void} Nothing when complete
   */
  debug(...args: any[]): void {
    // Spread options
    const { dryRun: dry, silent } = this.cache.options

    // Do nothing if logging isn't enabled
    if (silent) return

    // Format message
    const message = dry ? this.ch.yellow(args) : u.format.apply(u, args.flat())

    // Log message to console
    return console.log(message)
  }

  /**
   * Logs a message to the console in red.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  error(...text: unknown[]): void {
    return this.debug(this.ch.red(...text))
  }
}
