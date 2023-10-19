/**
 * @file Commands - ChangelogCommandOpts
 * @module grease/commands/ChangelogCommandOpts
 */

import type { ChangelogOperation } from '#src/changelog'
import type { Assign } from '@flex-development/tutils'
import type Opts from './grease.command.opts'

/**
 * Parsed `changelog` command options.
 *
 * @see {@linkcode ChangelogOperation}
 * @see {@linkcode Opts}
 *
 * @extends {Assign<ChangelogOperation,Opts>}
 */
interface ChangelogCommandOpts extends Assign<ChangelogOperation, Opts> {}

export type { ChangelogCommandOpts as default }
