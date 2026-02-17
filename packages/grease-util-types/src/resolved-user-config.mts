/**
 * @file Interfaces - ResolvedUserConfig
 * @module grease-util-types/interfaces/ResolvedUserConfig
 */

import type { UserConfigOption } from '@flex-development/grease-util-types'

/**
 * A resolved build configuration.
 */
interface ResolvedUserConfig {
  /**
   * The user configuration.
   *
   * @see {@linkcode UserConfigOption}
   */
  config: UserConfigOption

  /**
   * The URL of the config file.
   *
   * @see {@linkcode URL}
   */
  url: URL
}

export type { ResolvedUserConfig as default }
