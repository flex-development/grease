/**
 * @file Type Definitions - BumpFile
 * @module grease/bump/types/BumpFile
 */

import type { Manifest } from '#src/models'
import type { Constructor } from '@flex-development/tutils'

/**
 * A bump file.
 *
 * @see {@linkcode Manifest}
 */
type BumpFile = Constructor<Manifest, [cwd: string]>

export type { BumpFile as default }
