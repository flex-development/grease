/**
 * @file Type Definitions - Colors
 * @module grease/log/types/Colors
 */

import type { Assign, Omit } from '@flex-development/tutils'
import type * as tinyrainbow from 'tinyrainbow'

/**
 * Color functions map.
 *
 * @see {@linkcode tinyrainbow.Colors}
 */
type Colors = Assign<Omit<tinyrainbow.Colors, 'isColorSupported'>, {
  /**
   * Colorized output enabled?
   */
  color: boolean
}>

export type { Colors as default }
