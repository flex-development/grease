/**
 * @file Type Definitions - CommitLogField
 * @module grease/types/CommitLogField
 */

/**
 * Raw commit field names.
 */
type CommitLogField =
  | 'body'
  | 'date'
  | 'hash'
  | 'sha'
  | 'tags'
  | 'trailers'
  | `author.${'email' | 'name'}`

export type { CommitLogField as default }
