/**
 * @file Events - BumpEventListener
 * @module grease/bump/events/BumpEventListener
 */

import { RecommendedBump } from '#src/bump/models'
import { LoggerService } from '#src/providers'
import { EventsHandler, type IEventHandler } from '@nestjs/cqrs'
import BumpEvent from './bump.event'

/**
 * Bump event handler.
 *
 * @see {@linkcode BumpEvent}
 * @see {@linkcode IEventHandler}
 *
 * @class
 * @implements {IEventHandler<BumpEvent>}
 */
@EventsHandler(BumpEvent)
class BumpEventListener implements IEventHandler<BumpEvent> {
  /**
   * Create a new bump event listener.
   *
   * @param {LoggerService} logger - Logger instance
   */
  constructor(protected readonly logger: LoggerService) {}

  /**
   * Handle a bump event.
   *
   * @public
   *
   * @param {BumpEvent} event - Event to handle
   * @return {void} Nothing when complete
   */
  public handle(event: BumpEvent): void {
    const { context, payload } = event

    // sync logger settings
    this.logger.sync({ ...context, debug: true })

    // log recommended bump or successful version bump
    if (payload instanceof RecommendedBump) {
      this.logger.log(payload.bump)
      this.logger.debug('commits:', payload.commits)
      this.logger.debug('breaks:', payload.breaks)
      this.logger.debug('features:', payload.features)
    } else {
      this.logger.success('bumped manifest version to', payload.version.version)
    }

    return void event
  }
}

export default BumpEventListener
