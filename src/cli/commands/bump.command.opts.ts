/**
 * @file Commands - BumpCommandOpts
 * @module grease/commands/BumpCommandOpts
 */

import type { BumpOperation } from '#src/bump'
import type { Assign, Omit } from '@flex-development/tutils'
import type Opts from './grease.command.opts'

/**
 * Parsed `bump` command options.
 *
 * @see {@linkcode BumpOperation}
 * @see {@linkcode Opts}
 *
 * @extends {Omit<Assign<BumpOperation,Opts>,'release'>}
 */
interface BumpCommandOpts extends Omit<Assign<BumpOperation, Opts>, 'release'> {
  /**
   * Enable json output.
   *
   * @default false
   */
  json: boolean

  /**
   * Get a version bump recommendation.
   *
   * @default false
   */
  recommend: boolean
}

export type { BumpCommandOpts as default }
