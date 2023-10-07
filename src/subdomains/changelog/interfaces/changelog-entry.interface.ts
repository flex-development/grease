/**
 * @file Interfaces - IChangelogEntry
 * @module grease/interfaces/IChangelogEntry
 */

import type { BreakingChange, ICommit, Mention, Reference } from '#src/git'
import type { Nullable } from '@flex-development/tutils'
import type ICommitGroup from './commit-group.interface'

/**
 * Changelog entry object.
 *
 * @see {@linkcode ICommit}
 *
 * @template T - Parsed commit type
 */
interface IChangelogEntry<T extends ICommit = ICommit> {
  /**
   * Breaking changes.
   *
   * @see {@linkcode BreakingChange}
   */
  breaks: readonly BreakingChange[]

  /**
   * Entry date.
   */
  date: string

  /**
   * Parsed commit groups.
   *
   * @see {@linkcode ICommitGroup}
   */
  groups: readonly ICommitGroup<T>[]

  /**
   * Key commit.
   */
  key: Readonly<T>

  /**
   * Users and/or organizations mentioned in commit subjects.
   *
   * @see {@linkcode Mention}
   */
  mentions: readonly Mention[]

  /**
   * Entry is for patch release?
   */
  patch: boolean

  /**
   * Entry is for prerelease?
   */
  prerelease: boolean

  /**
   * Previous release tag.
   */
  previous: Nullable<string>

  /**
   * Issue and pull request references.
   *
   * @see {@linkcode Reference}
   */
  references: readonly Reference[]

  /**
   * Release tag.
   */
  release: string
}

export type { IChangelogEntry as default }
