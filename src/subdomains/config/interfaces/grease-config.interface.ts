/**
 * @file Interfaces - IGreaseConfig
 * @module grease/config/interfaces/IGreaseConfig
 */

import type { GlobalOptions } from '#src/options'
import type { Partial } from '@flex-development/tutils'

/**
 * Grease user configuration object.
 *
 * @see {@linkcode GlobalOptions}
 *
 * @extends {Partial<GlobalOptions>}
 */
interface IGreaseConfig extends Partial<GlobalOptions> {}

export type { IGreaseConfig as default }
