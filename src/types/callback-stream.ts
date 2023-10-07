/**
 * @file Type Definitions - StreamCallback
 * @module grease/types/StreamCallback
 */

import type { Fn, Nullable } from '@flex-development/tutils'

/**
 * A stream callback function.
 *
 * @template T - Error type
 */
type StreamCallback<T extends Error = Error> = Fn<[Nullable<T>?], void>

export type { StreamCallback as default }
