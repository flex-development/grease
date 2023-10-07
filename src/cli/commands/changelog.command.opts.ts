/**
 * @file Commands - ChangelogCommandOpts
 * @module grease/commands/ChangelogCommandOpts
 */

import type { ChangelogOperation } from '#src/changelog'

/**
 * Parsed `changelog` command options.
 *
 * @see {@linkcode ChangelogOperation}
 *
 * @extends {ChangelogOperation}
 */
interface ChangelogCommandOpts extends ChangelogOperation {}

export type { ChangelogCommandOpts as default }
