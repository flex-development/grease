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
   * Create a new bump event.
   *
   * @see {@linkcode GlobalOptions}
   * @see {@linkcode Manifest}
   * @see {@linkcode RecommendedBump}
   *
   * @param {Manifest | RecommendedBump} payload - Event payload
   * @param {GlobalOptions} context - Event context
   */
  constructor(
    public payload: Manifest | RecommendedBump,
    public context: GlobalOptions
  ) {}
}

export default BumpEvent
