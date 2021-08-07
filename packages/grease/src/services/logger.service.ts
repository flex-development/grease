import type { IGreaseCache, ILogger } from '@grease/interfaces'
import ch from 'chalk'
import figures from 'figures'
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
   * @param {string[]} [args=[]] - Additional messages
   * @param {keyof typeof figures | string} [figure='tick'] - Unicode symbol
   * @return {void} Nothing when complete
   */
  checkpoint(
    msg: string = '',
    args: string[] = [],
    figure: keyof typeof figures | string = 'tick'
  ): void {
    return this.debug(
      this.ch.bold(figures[figure] || figure),
      u.format.apply(u, [msg].concat(args.map(arg => this.ch.bold(arg))))
    )
  }

  /**
   * Base log function. Logs `args` if logging is enabled.
   *
   * @param {any[]} args - Log arguments
   * @return {void} Nothing when complete
   */
  debug(...args: any[]): void {
    console.warn(this.cache.options)

    // Spread options
    const { dryRun: dry, silent } = this.cache.options

    // Do nothing if logging isn't enabled
    if (silent) return

    // Format message
    const message = dry ? this.ch.yellow(args) : u.format.apply(u, args.flat())

    // Log message to console
    return console.log('  ', this.ch.bold(Logger.NAMESPACE), message)
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

  /**
   * Logs a message to the console in blue.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  info(...text: unknown[]): void {
    return this.debug(this.ch.blue(...text))
  }

  /**
   * Log a message to the console in white.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  log(...text: unknown[]): void {
    return this.debug(this.ch.white(...text))
  }

  /**
   * Logs a message to the console in green.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  success(...text: unknown[]): void {
    return this.debug(this.ch.green(...text))
  }

  /**
   * Logs a message to the console in yellow.
   *
   * @param {unknown[]} text - Log data
   * @return {void} Nothing when complete
   */
  warn(...text: unknown[]): void {
    return this.debug(this.ch.yellow(...text))
  }
}
