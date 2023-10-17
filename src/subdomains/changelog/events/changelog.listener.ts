/**
 * @file Events - ChangelogEventListener
 * @module grease/changelog/events/ChangelogEventListener
 */

import { LoggerService } from '#src/log'
import { EventsHandler, type IEventHandler } from '@nestjs/cqrs'
import ChangelogEvent from './changelog.event'

/**
 * Changelog event handler.
 *
 * @see {@linkcode ChangelogEvent}
 * @see {@linkcode IEventHandler}
 *
 * @class
 * @implements {IEventHandler<ChangelogEvent>}
 */
@EventsHandler(ChangelogEvent)
class ChangelogEventListener implements IEventHandler<ChangelogEvent> {
  /**
   * Create a new changelog event listener.
   *
   * @param {LoggerService} logger - Logger instance
   */
  constructor(protected readonly logger: LoggerService) {
    this.logger = logger.withTag('changelog')
  }

  /**
   * Handle a changelog event.
   *
   * @public
   *
   * @param {ChangelogEvent} event - Event to handle
   * @return {void} Nothing when complete
   */
  public handle(event: ChangelogEvent): void {
    const { context, payload } = event

    // sync logger settings
    this.logger.sync(context)

    // log changelog errors
    payload.on('error', this.logger.error.bind(this.logger))

    // print changelog stream
    return void payload.print()
  }
}

export default ChangelogEventListener
