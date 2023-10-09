/**
 * @file Providers - LoggerService
 * @module grease/providers/LoggerService
 */

import { LogLevel } from '#src/enums'
import { GlobalOptions } from '#src/options'
import {
  define,
  equal,
  get,
  ifelse,
  type Optional
} from '@flex-development/tutils'
import { Injectable, type LoggerService as ILogger } from '@nestjs/common'
import {
  createConsola,
  type ConsolaInstance,
  type ConsolaOptions,
  type LogLevel as Level
} from 'consola'
import { colors } from 'consola/utils'

/**
 * Logger service.
 *
 * @class
 * @implements {ILogger}
 */
@Injectable()
class LoggerService implements ILogger {
  /**
   * Internal logger instance.
   *
   * @see https://github.com/unjs/consola
   *
   * @protected
   * @readonly
   * @instance
   * @member {ConsolaInstance} consola
   */
  protected readonly consola: ConsolaInstance

  /**
   * Create a new logger service.
   */
  constructor() {
    this.consola = createConsola({
      fancy: true,
      formatOptions: { colors: true, columns: 0, date: false },
      level: LogLevel.INFO
    })
  }

  /**
   * Get a color functions map.
   *
   * @see {@linkcode colors}
   *
   * @public
   *
   * @return {typeof colors} Color functions map
   */
  public get color(): typeof colors {
    return colors
  }

  /**
   * Get a boolean indicating if colored output is enabled for `this` logger.
   *
   * @public
   *
   * @return {boolean} Boolean indicating if colored output is enabled
   */
  public get colors(): boolean {
    return !!this.consola.options.formatOptions.colors
  }

  /**
   * Toggle colored output for `this` logger.
   *
   * @public
   *
   * @param {Optional<boolean>} colors - Colored output enabled?
   */
  public set colors(colors: Optional<boolean>) {
    this.consola.options.formatOptions.colors = !!colors
  }

  /**
   * Get a boolean indicating if `this` logger is in debug mode.
   *
   * @public
   *
   * @return {boolean} Boolean indicating if logger is in debug mode
   */
  public get dbg(): boolean {
    return this.level >= LogLevel.DEBUG
  }

  /**
   * Toggle debug mode for `this` logger.
   *
   * @public
   *
   * @param {boolean} debug - Debug mode enabled?
   */
  public set dbg(debug: Optional<boolean>) {
    this.level = ifelse(!!debug, LogLevel.TRACE, LogLevel.INFO)
  }

  /**
   * Get `this` log level.
   *
   * @see https://github.com/unjs/consola#log-level
   *
   * @public
   *
   * @return {Level} Current log level
   */
  public get level(): Level {
    return this.consola.level
  }

  /**
   * Set `this` log level.
   *
   * @see https://github.com/unjs/consola#log-level
   *
   * @public
   *
   * @param {Level} level - New log level
   */
  public set level(level: Level) {
    this.consola.level = level
  }

  /**
   * Get a logger options object.
   *
   * @public
   *
   * @return {ConsolaOptions} Logger options object
   */
  public get options(): ConsolaOptions {
    return this.consola.options
  }

  /**
   * Get a boolean indicating if `this` logger is silenced.
   *
   * @public
   *
   * @return {boolean} Boolean indicating if logger is silenced
   */
  public get silent(): boolean {
    return equal(LogLevel.SILENT, this.level)
  }

  /**
   * Toggle output for `this` logger.
   *
   * @public
   *
   * @param {Optional<boolean>} silent - Logger silenced?
   */
  public set silent(silent: Optional<boolean>) {
    this.level = ifelse(!!silent, LogLevel.SILENT, LogLevel.INFO)
  }

  /**
   * Write a `debug` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public debug(message: any, ...args: unknown[]): void {
    return void this.consola.debug(message, ...args)
  }

  /**
   * Write a `error` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public error(message: any, ...args: unknown[]): void {
    return void this.consola.error(message, ...args)
  }

  /**
   * Write a `fatal` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public fatal(message: any, ...args: unknown[]): void {
    return void this.consola.fatal(message, ...args)
  }

  /**
   * Write a `info` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public info(message: any, ...args: unknown[]): void {
    return void this.consola.info(message, ...args)
  }

  /**
   * Write a `log` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public log(message: any, ...args: unknown[]): void {
    return void this.consola.log(message, ...args)
  }

  /**
   * Write a `ready` log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public ready(message: any, ...args: unknown[]): void {
    return void this.consola.ready(message, ...args)
  }

  /**
   * Write a `start` log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public start(message: any, ...args: unknown[]): void {
    return void this.consola.start(message, ...args)
  }

  /**
   * Write a `success` log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public success(message: any, ...args: unknown[]): void {
    return void this.consola.success(message, ...args)
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
    this.silent = get(opts, 'quiet')
    this.dbg = get(opts, 'debug')
    this.colors = get(opts, 'colors')
    return this
  }

  /**
   * Write a `trace` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public trace(message: any, ...args: unknown[]): void {
    return void this.consola.trace(message, ...args)
  }

  /**
   * Write a `verbose` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public verbose(message: any, ...args: unknown[]): void {
    return void this.consola.verbose(message, ...args)
  }

  /**
   * Write a `warn` level log.
   *
   * @public
   *
   * @param {any} message - Log message
   * @param {unknown[]} args - Message arguments
   * @return {void} Nothing when complete
   */
  public warn(message: any, ...args: unknown[]): void {
    return void this.consola.warn(message, ...args)
  }

  /**
   * Get a child logger.
   *
   * @public
   *
   * @param {string} tag - Child logger tag
   * @return {LoggerService} Tagged child logger
   */
  public withTag(tag: string): LoggerService {
    return define(new LoggerService(), 'consola', {
      value: this.consola.withTag('grease').withTag(tag)
    })
  }
}

export default LoggerService
