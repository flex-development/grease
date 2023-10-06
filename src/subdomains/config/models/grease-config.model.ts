/**
 * @file Models - GreaseConfig
 * @module grease/config/models/GreaseConfig
 */

import type { IGreaseConfig } from '#src/config/interfaces'
import { GlobalOptions } from '#src/options'

/**
 * Grease configuration options.
 *
 * @see {@linkcode GlobalOptions}
 * @see {@linkcode IGreaseConfig}
 *
 * @class
 * @extends {GlobalOptions}
 * @implements {IGreaseConfig}
 */
class GreaseConfig extends GlobalOptions implements IGreaseConfig {
  /**
   * Create a new options object.
   *
   * @see {@linkcode IGreaseConfig}
   *
   * @param {IGreaseConfig?} [opts={}] - User options
   */
  constructor(opts: IGreaseConfig = {}) {
    super(opts)
  }
}

export default GreaseConfig
