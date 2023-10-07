/**
 * @file Type Definitions - BreakingChange
 * @module grease/git/types/BreakingChange
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * A breaking change noted in a commit header or trailer.
 */
type BreakingChange = {
  /**
   * Breaking change date in strict ISO 8601 format (`%cI`).
   *
   * @see https://git-scm.com/docs/pretty-formats/2.21.0
   */
  date: string

  /**
   * Commit scope if breaking change was noted in a scoped commit message.
   */
  scope: Nullable<string>

  /**
   * Commit subject or breaking change trailer value.
   */
  subject: string

  /**
   * Commit type.
   */
  type: string
}

export type { BreakingChange as default }
