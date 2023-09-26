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
   * @default true
   */
  json: boolean

  /**
   * Enable markdown formatting.
   *
   * @default false
   */
  markdown: boolean

  /**
   * Enable YAML formatting.
   *
   * @default false
   */
  yaml: boolean
}

export type { InfoCommandOpts as default }
