/**
 * @file Type Definitions - BreakingChange
 * @module grease/types/BreakingChange
 */

import type { Nullable } from '@flex-development/tutils'

/**
 * A breaking change noted in a commit subject or trailer.
 */
type BreakingChange = {
  /**
   * Users mentioned in commit subject.
   */
  mentions: string[]

  /**
   * Pull request number if commit subject includes a pull request reference.
   */
  pr: Nullable<number>

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
