/**
 * @file Interfaces - ICommit
 * @module grease/git/interfaces/ICommit
 */

import type {
  Author,
  BreakingChange,
  Mention,
  Reference,
  Trailer
} from '#src/git/types'
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
   * Breaking changes noted in {@linkcode header} and {@linkcode trailers}.
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
   * Users and/or organizations mentioned in commit subject.
   *
   * @see {@linkcode Mention}
   */
  mentions: Mention[]

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
