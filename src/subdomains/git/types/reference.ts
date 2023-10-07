/**
 * @file Type Definitions - Reference
 * @module grease/git/types/Reference
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * Object representing a reference to an issue or pull request in a commit.
 */
type Reference = {
  /**
   * Reference action, if any.
   */
  action: Nullable<string>

  /**
   * Issue or pull request number.
   */
  number: number

  /**
   * Repository owner.
   */
  owner: Nullable<string>

  /**
   * Reference prefix.
   */
  prefix: string

  /**
   * The referenced issue or pull request.
   */
  ref: string

  /**
   * Repository name.
   */
  repo: Nullable<string>

  /**
   * Reference type.
   */
  type: '*' | 'issue' | 'pr'
}

export type { Reference as default }
