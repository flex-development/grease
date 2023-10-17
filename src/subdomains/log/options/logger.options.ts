/**
 * @file Models - LoggerOptions
 * @module grease/log/options/LoggerOptions
 */

import { LogLevel } from '#src/log/enums'
import type { ILogger } from '#src/log/interfaces'
import { FancyReporter, type Reporter } from '#src/log/reporters'
import { defaults, fallback, type Constructor } from '@flex-development/tutils'

/**
 * Logger options.
 *
 * @class
 */
class LoggerOptions {
  /**
   * Colorized output enabled?
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean} color
   */
  public color: boolean

  /**
   * Log level.
   *
   * @see {@linkcode LogLevel}
   *
   * @default LogLevel.LOG
   *
   * @public
   * @instance
   * @member {LogLevel} level
   */
  public level: LogLevel

  /**
   * Reporter classes.
   *
   * @see {@linkcode FancyReporter}
   * @see {@linkcode ILogger}
   * @see {@linkcode Reporter}
   *
   * @default [FancyReporter]
   *
   * @public
   * @instance
   * @member {Constructor<Reporter, [ILogger]>[]} reporters
   */
  public reporters: Constructor<Reporter, [logger: ILogger]>[]

  /**
   * Logger tag.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} tag
   */
  public tag: string

  /**
   * Create a new options object.
   *
   * @param {Partial<LoggerOptions>?} opts - Logger options
   */
  constructor(opts?: Partial<LoggerOptions>) {
    const {
      color,
      level,
      reporters,
      tag
    } = defaults(fallback(opts, {}), {
      color: true,
      level: LogLevel.LOG,
      reporters: [FancyReporter],
      tag: ''
    })

    this.color = color
    this.level = level
    this.reporters = reporters
    this.tag = tag
  }
}

export default LoggerOptions
