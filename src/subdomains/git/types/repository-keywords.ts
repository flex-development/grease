/**
 * @file Type Definitions - RepositoryKeywords
 * @module grease/git/types/RepositoryKeywords
 */

/**
 * Keywords used in reference URLs.
 */
type RepositoryKeywords = {
  /**
   * Commit reference keyword.
   *
   * @example
   *  'commit'
   */
  commit: string

  /**
   * Issue reference keyword.
   *
   * @example
   *  'issues'
   */
  issue: string

  /**
   * Pull request reference keyword.
   *
   * @example
   *  'pull'
   */
  pr: string
}

export type { RepositoryKeywords as default }
