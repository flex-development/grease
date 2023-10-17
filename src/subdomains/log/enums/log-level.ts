/**
 * @file Enums - LogLevel
 * @module grease/log/enums/LogLevel
 */

import type { Opaque } from '@flex-development/tutils'

/**
 * Log levels.
 *
 * @enum {number}
 */
enum LogLevel {
  DEBUG = 4,
  ERROR = 0,
  FATAL = -1,
  INFO = 3,
  LOG = 2,
  SILENT = <Opaque<number, '-INFINITY'>>Number.NEGATIVE_INFINITY,
  TRACE = 5,
  VERBOSE = <Opaque<number, 'INFINITY'>>Number.POSITIVE_INFINITY,
  WARN = 1
}

export default LogLevel
