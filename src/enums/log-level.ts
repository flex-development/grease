/**
 * @file Enums - LogLevel
 * @module grease/enums/LogLevel
 */

import type * as consola from 'consola'

/**
 * Log levels.
 *
 * @see https://github.com/unjs/consola#log-level
 *
 * @enum {consola.LogLevel}
 */
const LogLevel = Object.freeze({
  DEBUG: 4,
  ERROR: 0,
  FATAL: 0,
  INFO: 3,
  LOG: 2,
  SILENT: Number.NEGATIVE_INFINITY,
  TRACE: 5,
  VERBOSE: Number.POSITIVE_INFINITY,
  WARN: 1
} as const)

export default LogLevel
