/**
 * @file Type Definitions - CommitFields
 * @module grease/types/CommitFields
 */

import type { Assign, Construct } from '@flex-development/tutils'
import type CommitLogField from './commit-log-field'

/**
 * Object containing raw commit fields.
 *
 * @see {@linkcode CommitLogField}
 */
type CommitFields = Assign<Construct<Record<CommitLogField, string>>, {
  [K in 'breaking' | 'pr' | 'scope' | 'subject' | 'type']: string
}>

export type { CommitFields as default }
