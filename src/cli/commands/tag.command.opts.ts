/**
 * @file Commands - TagCommandOpts
 * @module grease/commands/TagCommandOpts
 */

import type { TagOperation } from '#src/git'
import type { Omit } from '@flex-development/tutils'

/**
 * Parsed `tag` command options.
 *
 * @see {@linkcode TagOperation}
 *
 * @extends {Omit<TagOperation,'tag'>}
 */
interface TagCommandOpts extends Omit<TagOperation, 'tag'> {
  /**
   * List git tags.
   *
   * @default false
   */
  list: boolean

  /**
   * Tag sorting configuration.
   *
   * Implies {@linkcode list}.
   *
   * @see https://git-scm.com/docs/git-tag#Documentation/git-tag.txt---sortltkeygt
   *
   * @default ['-creatordate']
   */
  sort: string[]
}

export type { TagCommandOpts as default }
