/**
 * @file Commands - BumpCommandOpts
 * @module grease/commands/BumpCommandOpts
 */

import type { BumpOperation } from '#src/subdomains/bump'
import type { Omit } from '@flex-development/tutils'

/**
 * Parsed `bump` command options.
 *
 * @see {@linkcode BumpOperation}
 *
 * @extends {Omit<BumpOperation,'release'>}
 */
interface BumpCommandOpts extends Omit<BumpOperation, 'release'> {
  /**
   * Get a version bump recommendation.
   *
   * @default false
   */
  recommend: boolean
}

export type { BumpCommandOpts as default }
