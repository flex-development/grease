/**
 * @file Reporters - FancyReporter
 * @module grease/log/reporters/FancyReporter
 */

import { LogLevel, LogType } from '#src/log/enums'
import { LogObject } from '#src/log/models'
import type { Color } from '#src/log/types'
import pathe from '@flex-development/pathe'
import {
  fallback,
  ifelse,
  join,
  select,
  sift,
  split,
  template,
  trim,
  uppercase
} from '@flex-development/tutils'
import isUnicodeSupported from 'is-unicode-supported'
import util from 'node:util'
import sw from 'string-width'
import wrap from 'word-wrap'
import Reporter from './reporter.abstract'

/**
 * Fancy log reporter.
 *
 * @see {@linkcode Reporter}
 *
 * @class
 * @extends {Reporter}
 */
class FancyReporter extends Reporter {
  /**
   * Format an icon.
   *
   * @see {@linkcode LogObject}
   *
   * @protected
   *
   * @param {LogObject} log - Log object
   * @return {string} Formatted icon
   */
  protected formatIcon(log: LogObject): string {
    /**
     * Log object icon.
     *
     * @const {string} icon
     */
    const icon: string = this.icon(log)

    // exit early if no icon to format
    if (!icon) return icon

    /**
     * Background or icon color.
     *
     * @var {Color} color
     */
    let color: Color

    // get color
    switch (<Exclude<LogType, LogType.LOG>>log.type) {
      case LogType.DEBUG:
      case LogType.TRACE:
      case LogType.VERBOSE:
        color = 'gray'
        break
      case LogType.ERROR:
      case LogType.FATAL:
        color = 'bgRed'
        break
      case LogType.FAIL:
        color = 'red'
        break
      case LogType.INFO:
        color = 'cyan'
        break
      case LogType.START:
        color = 'magenta'
        break
      case LogType.SUCCESS:
        color = 'green'
        break
      case LogType.WARN:
        color = 'yellow'
        break
    }

    return this.logger.colors[color](ifelse(
      log.level <= LogLevel.ERROR && log.type !== LogType.FAIL,
      template(' {type} ', { type: uppercase(log.type) }),
      icon
    ))
  }

  /**
   * Format a log object.
   *
   * @see {@linkcode LogObject}
   *
   * @protected
   *
   * @param {LogObject} log - Log object
   * @return {string} Formatted log object
   */
  protected formatLogObject(log: LogObject): string {
    // recursively format log data
    if (log.message instanceof LogObject) {
      return this.formatLogObject(log.message)
    }

    /**
     * Text appended to formatted log object.
     *
     * @const {string} header
     */
    const header: string = join(sift([
      this.formatTag(log),
      this.formatIcon(log)
    ]), ' ')

    /**
     * Indentation size.
     *
     * @const {string} indent
     */
    const indent: string = ' '.repeat(sw(header))

    /**
     * Formatted log message lines.
     *
     * @const {string[]} lines
     */
    const lines: string[] = split(util.formatWithOptions({
      breakLength: process.stdout.columns,
      colors: this.logger.options.color
    }, log.message, ...log.args), '\n')

    return template('{newline}{header} {lines}{trace}', {
      header,
      lines: join(select(lines, null, (line: string, i: number): string => {
        return ifelse(i, wrap(line, { indent, width: line.length }), line)
      }), '\n'),
      newline: ifelse(log.level <= LogLevel.ERROR && log.error, '\n', ''),
      trace: this.formatTrace(log)
    })
  }

  /**
   * Format a logger tag.
   *
   * @see {@linkcode LogObject}
   *
   * @protected
   *
   * @param {LogObject} log - Log object
   * @return {string} Formatted tag
   */
  protected formatTag(log: LogObject): string {
    return ifelse(log.tag, this.logger.colors.gray(template('[{tag}]', {
      tag: log.tag
    })), '')
  }

  /**
   * Format a stack trace.
   *
   * @see {@linkcode LogObject}
   *
   * @protected
   *
   * @param {LogObject} log - Log object
   * @return {string} Formatted stack trace
   */
  protected formatTrace(log: LogObject): string {
    /**
     * Stack trace.
     *
     * @var {string} stack
     */
    let stack: string

    // get stack trace
    switch (true) {
      case !!log.error?.stack:
        stack = log.error!.stack!
        break
      default:
        return ''
    }

    return template('\n\n{trace}\n', {
      trace: join(select(split(stack, '\n').splice(1), null, line => {
        return ' '.repeat(sw(this.formatTag(log)) + 3) + trim(line)
          .replace(/(?<= \()file:\/\//, '')
          .replace(process.cwd() + pathe.sep, '')
          .replace(/^at+/, this.logger.colors.gray)
          .replace(/(?<=\().+(?=\))/, this.logger.colors.cyan)
      }), '\n')
    })
  }

  /**
   * Get a log object icon.
   *
   * @see {@linkcode LogObject}
   *
   * @protected
   *
   * @param {LogObject} log - Log object
   * @return {string} Log object icon
   */
  protected icon(log: LogObject): string {
    /**
     * Log object icon.
     *
     * @var {string} icon
     */
    let icon: string

    // get icon
    switch (log.type) {
      case LogType.DEBUG:
        icon = fallback('D', '⚙', isUnicodeSupported)
        break
      case LogType.ERROR:
      case LogType.FAIL:
      case LogType.FATAL:
        icon = fallback('×', '✖', isUnicodeSupported)
        break
      case LogType.INFO:
        icon = fallback('i', 'ℹ', isUnicodeSupported)
        break
      case LogType.LOG:
        icon = ''
        break
      case LogType.START:
        icon = fallback('o', '◐', isUnicodeSupported)
        break
      case LogType.SUCCESS:
        icon = fallback('√', '✔', isUnicodeSupported)
        break
      case LogType.TRACE:
        icon = fallback('→', '→', isUnicodeSupported)
        break
      case LogType.VERBOSE:
        icon = fallback('>', '❯', isUnicodeSupported)
        break
      case LogType.WARN:
        icon = fallback('‼', '⚠', isUnicodeSupported)
        break
    }

    return icon
  }

  /**
   * Write a log.
   *
   * @see {@linkcode LogObject}
   *
   * @public
   *
   * @param {LogObject} log - Log object to write
   * @return {void} Nothing when complete
   */
  public write(log: LogObject): void {
    /**
     * Writer data.
     *
     * @const {string} data
     */
    const data: string = this.formatLogObject(log) + '\n'

    /**
     * Writer name suffix.
     *
     * @const {'err' | 'out'} writer
     */
    const writer: 'err' | 'out' = log.level < LogLevel.LOG ? 'err' : 'out'

    // write log to stderr or stdout based on log level
    return void process[`std${writer}`].write(data)
  }
}

export default FancyReporter
