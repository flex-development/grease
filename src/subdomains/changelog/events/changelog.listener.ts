/**
 * @file Events - ChangelogEventListener
 * @module grease/changelog/events/ChangelogEventListener
 */

import type { ChangelogChunk } from '#src/changelog/types'
import { LoggerService } from '#src/providers'
import { isString } from '@flex-development/tutils'
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

    // debug chunks
    payload.on('data', (chunk: ChangelogChunk): void => {
      !isString(chunk) && this.logger.debug(chunk)
      return void chunk
    })

    // log changelog errors
    payload.on('error', this.logger.error.bind(this.logger))

    // print changelog stream
    return void payload.print()
  }
}

export default ChangelogEventListener
