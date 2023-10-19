/**
 * @file Commands - InfoCommandOpts
 * @module grease/commands/InfoCommandOpts
 */

import type Opts from './grease.command.opts'

/**
 * Parsed `info` command options.
 *
 * @see {@linkcode Opts}
 *
 * @extends {Opts}
 */
interface InfoCommandOpts extends Opts {
  /**
   * Enable json output.
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

  /**
   * Package manager name.
   */
  pm?: 'npm' | 'pnpm' | 'Yarn'
}

export type { InfoCommandOpts as default }
