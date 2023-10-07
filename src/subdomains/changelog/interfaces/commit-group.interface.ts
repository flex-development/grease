/**
 * @file Interfaces - ICommitGroup
 * @module grease/changelog/interfaces/ICommitGroup
 */

import type { ICommit } from '#src/git'

/**
 * Commit group object.
 *
 * @see {@linkcode ICommit}
 *
 * @template T - Parsed commit type
 */
interface ICommitGroup<T extends ICommit = ICommit> {
  /**
   * Parsed commits.
   */
  commits: T[]

  /**
   * Remove commit group from changelog.
   *
   * @default false
   */
  hidden: boolean

  /**
   * Group key.
   */
  key: string

  /**
   * Group title.
   *
   * @default key
   */
  section: string
}

export type { ICommitGroup as default }
