/**
 * @file Type Definitions - Color
 * @module grease/log/types/Color
 */

import type Colors from './colors'

/**
 * Color function names.
 *
 * @see {@linkcode Colors}
 */
type Color = Exclude<keyof Colors, 'enabled'>

export type { Color as default }
