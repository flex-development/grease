/**
 * @file Reporters - Reporter
 * @module grease/log/reporters/Reporter
 */

import type { ILogger } from '#src/log/interfaces'
import type { LogObject } from '#src/log/models'

/**
 * Abstract log reporter.
 *
 * @class
 * @abstract
 */
abstract class Reporter {
  /**
   * Create a new reporter.
   *
   * @see {@linkcode ILogger}
   *
   * @param {ILogger} logger - Parent logger instance
   */
  constructor(protected readonly logger: ILogger) {}

  /**
   * Write a log.
   *
   * @see {@linkcode LogObject}
   *
   * @public
   * @abstract
   *
   * @param {LogObject} log - Log object to write
   * @return {void} Nothing when complete
   */
  public abstract write(log: LogObject): void
}

export default Reporter
