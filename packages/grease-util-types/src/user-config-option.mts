/**
 * @file UserConfigOption
 * @module grease-util-types/UserConfigOption
 */

import type {
  GetUserConfig,
  UserConfig
} from '@flex-development/grease-util-types'

/**
 * Union of types that can occur where a user configuration is expected.
 *
 * @see {@linkcode GetUserConfig}
 * @see {@linkcode UserConfig}
 */
type UserConfigOption = GetUserConfig | UserConfig

export type { UserConfigOption as default }
