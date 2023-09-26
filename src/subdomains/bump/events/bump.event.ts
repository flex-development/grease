/**
 * @file Events - BumpEvent
 * @module grease/bump/events/BumpEvent
 */

import type { RecommendedBump } from '#src/bump/models'
import type { IEvent } from '#src/interfaces'
import type { Manifest } from '#src/models'
import type { GlobalOptions } from '#src/options'

/**
 * Bump event.
 *
 * @see {@linkcode IEvent}
 * @see {@linkcode Manifest}
 * @see {@linkcode RecommendedBump}
 *
 * @class
 * @implements {IEvent<Manifest|RecommendedBump>}
 */
class BumpEvent implements IEvent<Manifest | RecommendedBump> {
  /**
   * Event context.
   *
   * @public
   * @instance
   * @member {GlobalOptions} context
   */
  public context: GlobalOptions

  /**
   * Event payload.
   *
   * @public
   * @instance
   * @member {Manifest | RecommendedBump} payload
   */
  public payload: Manifest | RecommendedBump

  /**
   * Create a new bump event.
   *
   * @param {Manifest | RecommendedBump} payload - Event payload
   * @param {GlobalOptions} context - Event context
   */
  constructor(payload: Manifest | RecommendedBump, context: GlobalOptions) {
    this.context = context
    this.payload = payload
  }
}

export default BumpEvent
