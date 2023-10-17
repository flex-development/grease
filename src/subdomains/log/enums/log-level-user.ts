/**
 * @file Enums - UserLogLevel
 * @module grease/log/enums/UserLogLevel
 */

import type LogLevel from './log-level'

/**
 * User-friendly log levels.
 *
 * @enum {Lowercase<keyof typeof LogLevel>}
 */
enum UserLogLevel {
  DEBUG = 'debug',
  ERROR = 'error',
  FATAL = 'fatal',
  INFO = 'info',
  LOG = 'log',
  SILENT = 'silent',
  TRACE = 'trace',
  VERBOSE = 'verbose',
  WARN = 'warn'
}

export default UserLogLevel
