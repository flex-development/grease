/**
 * @file Interfaces - IEvent
 * @module grease/interfaces/IEvent
 */

import type { ObjectCurly } from '@flex-development/tutils'

/**
 * Event object.
 *
 * @template T - Event payload type
 */
interface IEvent<T extends ObjectCurly> {
  /**
   * Event payload.
   */
  payload: T
}

export type { IEvent as default }
