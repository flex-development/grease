/**
 * @file Commands - GreaseCommandOpts
 * @module grease/commands/GreaseCommandOpts
 */

import type { GlobalOptions } from '#src/options'

/**
 * Parsed `grease` command options.
 *
 * @see {@linkcode GlobalOptions}
 *
 * @extends {GlobalOptions}
 */
interface GreaseCommandOpts extends GlobalOptions {}

export type { GreaseCommandOpts as default }
