/**
 * @file Commands - InfoCommandOpts
 * @module grease/commands/InfoCommandOpts
 */

import type { GlobalOptions } from '#src/options'
import type { Omit } from '@flex-development/tutils'

/**
 * Parsed `info` command options.
 *
 * @see {@linkcode GlobalOptions}
 *
 * @extends {Omit<GlobalOptions,'tagprefix'>}
 */
interface InfoCommandOpts extends Omit<GlobalOptions, 'tagprefix'> {
  /**
   * Enable json formatting.
   *
   * @default false
   */
  json: boolean

  /**
   * Enable markdown formatting.
   *
   * @default false
   */
  markdown: boolean
}

export type { InfoCommandOpts as default }
