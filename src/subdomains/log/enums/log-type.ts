/**
 * @file Enums - LogType
 * @module grease/log/enums/LogType
 */

/**
 * Log types.
 *
 * @enum {Lowercase<string>}
 */
enum LogType {
  DEBUG = 'debug',
  ERROR = 'error',
  FAIL = 'fail',
  FATAL = 'fatal',
  INFO = 'info',
  LOG = 'log',
  START = 'start',
  SUCCESS = 'success',
  TRACE = 'trace',
  VERBOSE = 'verbose',
  WARN = 'warn'
}

export default LogType
