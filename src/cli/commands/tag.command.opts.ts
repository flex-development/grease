/**
 * @file Commands - TagCommandOpts
 * @module grease/commands/TagCommandOpts
 */

import type { TagOperation } from '#src/git'
import type { Assign, Omit } from '@flex-development/tutils'
import type Opts from './grease.command.opts'

/**
 * Parsed `tag` command options.
 *
 * @see {@linkcode Opts}
 * @see {@linkcode TagOperation}
 *
 * @extends {Omit<Assign<TagOperation,Opts>,'tag'>}
 */
interface TagCommandOpts extends Omit<Assign<TagOperation, Opts>, 'tag'> {
  /**
   * Enable json output.
   *
   * @default false
   */
  json: boolean

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
