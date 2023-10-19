/**
 * @file Events - BumpEvent
 * @module grease/bump/events/BumpEvent
 */

import type { RecommendedBump } from '#src/bump/models'
import type { BumpOperation } from '#src/bump/operations'
import type { BumpQuery } from '#src/bump/queries'
import type { IEvent } from '#src/interfaces'
import type { Version } from '#src/models'

/**
 * Bump event.
 *
 * @see {@linkcode IEvent}
 * @see {@linkcode RecommendedBump}
 * @see {@linkcode Version}
 *
 * @class
 * @implements {IEvent<RecommendedBump|Version>}
 */
class BumpEvent implements IEvent<RecommendedBump | Version> {
  /**
   * Create a new bump event.
   *
   * @see {@linkcode BumpOperation}
   * @see {@linkcode BumpQuery}
   * @see {@linkcode RecommendedBump}
   * @see {@linkcode Version}
   *
   * @param {RecommendedBump | Version} payload - Event payload
   * @param {BumpOperation | BumpQuery} context - Event context
   */
  constructor(
    public readonly payload: RecommendedBump | Version,
    public readonly context: BumpOperation | BumpQuery
  ) {}
}

export default BumpEvent
