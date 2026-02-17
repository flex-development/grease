/**
 * @file defineConfig
 * @module grease-util-config/lib/defineConfig
 */

import type {
  Awaitable,
  GetUserConfig,
  UserConfig,
  UserConfigOption
} from '@flex-development/grease-util-types'

export default defineConfig

/**
 * Define a user configuration.
 *
 * @see {@linkcode UserConfig}
 *
 * @this {void}
 *
 * @param {UserConfig | null | undefined} [config]
 *  The user config object
 * @return {UserConfig}
 *  The config object
 */
function defineConfig(
  this: void,
  config?: UserConfig | null | undefined
): UserConfig

/**
 * Define a user configuration.
 *
 * @see {@linkcode Awaitable}
 * @see {@linkcode GetUserConfig}
 *
 * @template {Awaitable<UserConfig>} [T]
 *  The user config
 *
 * @this {void}
 *
 * @param {GetUserConfig<T>} config
 *  The user config function
 * @return {GetUserConfig<T>}
 *  The `config` function
 */
function defineConfig<T extends Awaitable<UserConfig> = Awaitable<UserConfig>>(
  this: void,
  config: GetUserConfig<T>
): GetUserConfig<T>

/**
 * Define a user configuration.
 *
 * @see {@linkcode UserConfigOption}
 *
 * @this {void}
 *
 * @param {UserConfigOption | null | undefined} [config]
 *  The user config
 * @return {UserConfigOption}
 *  The user config
 */
function defineConfig(
  this: void,
  config?: UserConfigOption | null | undefined
): UserConfigOption

/**
 * Define a user configuration.
 *
 * @see {@linkcode UserConfig}
 *
 * @this {void}
 *
 * @param {unknown} config
 *  The user config
 * @return {UserConfig}
 *  The user config
 */
function defineConfig(this: void, config: unknown): UserConfig

/**
 * Define a user configuration.
 *
 * @see {@linkcode UserConfigOption}
 *
 * @this {void}
 *
 * @param {unknown} [config]
 *  The user config
 * @return {UserConfigOption}
 *  The user configuration
 */
function defineConfig(
  this: void,
  config?: unknown
): UserConfigOption {
  return config && !Array.isArray(config) ? config : {}
}
