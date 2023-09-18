/**
 * @file Interfaces - ICommit
 * @module grease/interfaces/ICommit
 */

import type { Author, BreakingChange, Reference, Trailer } from '#src/types'
import type { Nullable } from '@flex-development/tutils'

/**
 * A parsed commit.
 *
 * @see https://conventionalcommits.org
 */
interface ICommit {
  /**
   * Commit author details.
   *
   * @see {@linkcode Author}
   */
  author: Author

  /**
   * Commit body text.
   */
  body: string

  /**
   * Boolean indicating if commit contains breaking changes.
   */
  breaking: boolean

  /**
   * Breaking changes noted in {@linkcode subject} and {@linkcode trailers}.
   *
   * @see {@linkcode BreakingChange}
   */
  breaks: BreakingChange[]

  /**
   * Commit date in strict ISO 8601 format (`%cI`).
   *
   * @see https://git-scm.com/docs/pretty-formats/2.21.0
   */
  date: string

  /**
   * Abbreviated commit SHA.
   */
  hash: string

  /**
   * Commit {@linkcode type}, {@linkcode scope}, breaking change indicator, and
   * {@linkcode subject}.
   */
  header: string

  /**
   * Users mentioned in commit message.
   */
  mentions: string[]

  /**
   * Pull request number if commit {@linkcode subject} includes a pull request
   * reference.
   */
  pr: Nullable<number>

  /**
   * Issue and/or pull request references.
   *
   * @see {@linkcode Reference}
   */
  references: Reference[]

  /**
   * Commit scope.
   */
  scope: Nullable<string>

  /**
   * Commit SHA.
   */
  sha: string

  /**
   * Commit subject.
   */
  subject: string

  /**
   * Tags associated with commit.
   */
  tags: string[]

  /**
   * Commit message trailers.
   *
   * @see {@linkcode Trailer}
   */
  trailers: Trailer[]

  /**
   * Commit type.
   */
  type: string

  /**
   * Release tag.
   */
  version: Nullable<string>
}

export type { ICommit as default }
