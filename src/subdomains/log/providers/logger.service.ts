/**
 * @file Providers - LoggerService
 * @module grease/log/providers/LoggerService
 */

import { LogLevel, LogType, UserLogLevel } from '#src/log/enums'
import type { ILogger, InputLog } from '#src/log/interfaces'
import { LogObject } from '#src/log/models'
import { LoggerOptions } from '#src/log/options'
import type { Reporter } from '#src/log/reporters'
import type { Colors } from '#src/log/types'
import type { GlobalOptions } from '#src/options'
import {
  at,
  define,
  fallback,
  ifelse,
  includes,
  isEmptyString,
  isNIL,
  isNumber,
  isString,
  isUndefined,
  lowercase,
  omit,
  select,
  set,
  sort,
  template,
  uppercase,
  values,
  type Assign,
  type Nilable,
  type OrLowercase
} from '@flex-development/tutils'
import { Injectable, Optional } from '@nestjs/common'
import * as tr from 'tinyrainbow'

/**
 * Logger service.
 *
 * @see {@linkcode ILogger}
 *
 * @class
 * @implements {ILogger}
 */
@Injectable()
class LoggerService implements ILogger {
  /**
   * Logger options.
   *
   * @see {@linkcode LoggerOptions}
   *
   * @public
   * @readonly
   * @instance
   * @member {LoggerOptions} options
   */
  public readonly options: LoggerOptions

  /**
   * Create a new logger service.
   *
   * @see {@linkcode LoggerOptions}
   *
   * @param {LoggerOptions?} [options=new LoggerOptions()] - Logger options
   */
  constructor(@Optional() options?: LoggerOptions) {
    this.options = fallback(options, new LoggerOptions())
  }

  /**
   * Get a color functions map.
   *
   * @see {@linkcode Colors}
   *
   * @public
   *
   * @return {Colors} Color functions map
   */
  public get colors(): Colors {
    const { FORCE_COLOR, GITHUB_ACTIONS: GHA, NO_COLOR } = process.env

    // ensure color option controls colorized output
    delete process.env.FORCE_COLOR
    delete process.env.GITHUB_ACTIONS
    delete process.env.NO_COLOR

    /**
     * Color functions map.
     *
     * @const {tr.Colors} colors
     */
    const colors: tr.Colors = tr.createColors(this.options.color)

    // reset process.env
    !isUndefined(FORCE_COLOR) && (process.env.FORCE_COLOR = FORCE_COLOR)
    !isUndefined(GHA) && (process.env.GITHUB_ACTIONS = GHA)
    !isUndefined(NO_COLOR) && (process.env.NO_COLOR = NO_COLOR)

    return define(omit(colors, ['isColorSupported']), 'color', {
      value: this.options.color
    })
  }

  /**
   * Get `this` log level.
   *
   * @see {@linkcode LogLevel}
   *
   * @public
   *
   * @return {LogLevel} Current log level
   */
  public get level(): LogLevel {
    return this.options.level
  }

  /**
   * Set `this` log level.
   *
   * @see {@linkcode LogLevel}
   * @see {@linkcode UserLogLevel}
   *
   * @public
   *
   * @param {LogLevel | OrLowercase<UserLogLevel>} level - New log level
   */
  public set level(level: LogLevel | OrLowercase<UserLogLevel>) {
    if (isNumber(level) && includes(values(LogLevel), level)) {
      this.options.level = level
    }

    if (isString(level) && includes(values(UserLogLevel), lowercase(level))) {
      this.options.level = LogLevel[uppercase(level)]
    }
  }

  /**
   * Get reporters for `this` logger.
   *
   * @see {@linkcode LoggerOptions.reporters}
   * @see {@linkcode Reporter}
   *
   * @public
   *
   * @return {Reporter[]} Reporters array
   */
  public get reporters(): Reporter[] {
    return select(this.options.reporters, null, Reporter => new Reporter(this))
  }

  /**
   * Get `this` logger tag.
   *
   * @public
   *
   * @return {string} Current logger tag
   */
  public get tag(): string {
    return this.options.tag
  }

  /**
   * Set `this` logger tag.
   *
   * @public
   *
   * @param {Nilable<string>} tag - New logger tag
   */
  public set tag(tag: Nilable<string>) {
    this.options.tag = fallback(tag, '', isNIL)
  }

  /**
   * Write a `debug` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public debug(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.debug.name
    })
  }

  /**
   * Write an `error` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public error(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.error.name
    })
  }

  /**
   * Write a failure log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public fail(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.fail.name
    })
  }

  /**
   * Write a `fatal` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public fatal(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.fatal.name
    })
  }

  /**
   * Write an `info` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public info(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.info.name
    })
  }

  /**
   * Write a `log` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public log(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.log.name
    })
  }

  /**
   * Set `this` log level to the highest level in the given log level array.
   *
   * @public
   *
   * @param {OrLowercase<UserLogLevel>[]} levels - Log levels
   * @return {LogLevel} `this` log level
   */
  public setLogLevels(levels: OrLowercase<UserLogLevel>[]): LogLevel {
    if (levels.length) {
      this.level = at(sort(levels, (level1, level2) => {
        return LogLevel[uppercase(level2)] - LogLevel[uppercase(level1)]
      }), 0)
    }

    return this.level
  }

  /**
   * Write a `start` log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public start(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.start.name
    })
  }

  /**
   * Write a `success` log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public success(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.success.name
    })
  }

  /**
   * Sync global options.
   *
   * @see {@linkcode GlobalOptions}
   *
   * @public
   *
   * @param {Partial<GlobalOptions>?} [opts] - Global options
   * @return {this} `this` synced logger
   */
  public sync(opts?: Partial<GlobalOptions>): this {
    const { color, level } = fallback(opts, <Partial<GlobalOptions>>{})

    !isUndefined(color) && (this.options.color = !!color)
    !isUndefined(level) && (this.level = level)

    return this
  }

  /**
   * Write a `trace` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public trace(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.trace.name
    })
  }

  /**
   * Write a `verbose` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public verbose(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.verbose.name
    })
  }

  /**
   * Write a `warn` level log.
   *
   * @public
   *
   * @param {unknown} message - Log message
   * @param {any[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public warn(message: unknown, ...args: any[]): void {
    return void this.write({
      args,
      message,
      type: <LogType>this.warn.name
    })
  }

  /**
   * Get a tagged logger.
   *
   * @public
   *
   * @param {Nilable<string>?} [tag] - Logger tag
   * @return {LoggerService} Tagged logger
   */
  public withTag(tag?: Nilable<string>): LoggerService {
    return new LoggerService({
      ...this.options,
      tag: ifelse(
        this.tag.length && isString(tag) && tag.length,
        template('{parent}:{tag}', { parent: this.tag, tag }),
        fallback(tag, this.tag, isNIL)
      )
    })
  }

  /**
   * Write a log.
   *
   * @see {@linkcode InputLog}
   * @see {@linkcode LogObject}
   * @see {@linkcode LogType}
   *
   * @protected
   *
   * @param {Assign<InputLog, { type: LogType }>} input - Input log object
   * @return {Assign<LogObject, { written: boolean }>} Log object
   */
  protected write(
    input: Assign<InputLog, { type: LogType }>
  ): Assign<LogObject, { reported: boolean }> {
    // write log recursively
    if (input.message instanceof LogObject) {
      return this.write({ ...input.message, type: input.type })
    }

    /**
     * Log object.
     *
     * @const {LogObject} log
     */
    const log: LogObject = new LogObject(input)

    /**
     * Boolean indicating log was sent to reporters.
     *
     * @var {boolean} reported
     */
    let reported: boolean = false

    // add default logger tag, but allow null override
    this.tag && (log.tag = fallback(log.tag, this.tag, isEmptyString))

    // send log to reporters
    if (log.level >= LogLevel.FATAL && log.level <= this.level) {
      for (const reporter of this.reporters) {
        reporter.write(log)
        reported = true
      }
    }

    return set(log, 'reported', reported)
  }
}

export default LoggerService
