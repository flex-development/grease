/**
 * @file Type Definitions - ChangelogChunk
 * @module grease/changelog/types/ChangelogChunk
 */

import type { ChangelogEntry, ChangelogInfile } from '#src/changelog/models'
import type { Commit } from '#src/git'
import type { Nullable, Stringafiable } from '@flex-development/tutils'

/**
 * A changelog stream chunk.
 *
 * @see {@linkcode ChangelogEntry}
 * @see {@linkcode ChangelogInfile}
 * @see {@linkcode Commit}
 * @see {@linkcode Stringafiable}
 *
 * @template T - Parsed commit type
 */
type ChangelogChunk<T extends Commit = Commit> = Nullable<
  | ChangelogEntry<T>
  | ChangelogInfile
  | Stringafiable
>

export type { ChangelogChunk as default }
