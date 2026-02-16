/**
 * @file GetUserConfig
 * @module grease-util-types/GetUserConfig
 */

import type { Awaitable, UserConfig } from '@flex-development/grease-util-types'

/**
 * Get a user configuration.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode UserConfig}
 *
 * @template {Awaitable<UserConfig>} [T]
 *  The user config
 *
 * @this {void}
 *
 * @return {T}
 *  The user config, or a promise resolving to the user config
 */
type GetUserConfig<
  T extends Awaitable<UserConfig> = Awaitable<UserConfig>
> = (this: void) => T

export type { GetUserConfig as default }
