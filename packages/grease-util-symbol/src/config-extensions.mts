/**
 * @file configExtensions
 * @module grease-util-symbol/configExtensions
 */

import type { Ext } from '@flex-development/grease-util-types'

/**
 * A list of config file extensions, in order of priority.
 *
 * @const {ReadonlyArray<Ext>} configExtensions
 */
const configExtensions: readonly Ext[] = Object.freeze([
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.json',
  '.jsonc',
  '.json5'
])

export default configExtensions
