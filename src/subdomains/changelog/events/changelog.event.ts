/**
 * @file Events - ChangelogEvent
 * @module grease/changelog/events/ChangelogEvent
 */

import type { ChangelogStream } from '#src/changelog/models'
import type { ChangelogOperation } from '#src/changelog/operations'
import type { Commit } from '#src/git'
import type { IEvent } from '#src/interfaces'

/**
 * Changelog event.
 *
 * @see {@linkcode ChangelogStream}
 * @see {@linkcode Commit}
 * @see {@linkcode IEvent}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @implements {IEvent<ChangelogStream<T>>}
 */
class ChangelogEvent<T extends Commit = Commit>
  implements IEvent<ChangelogStream<T>> {
  /**
   * Create a new changelog event.
   *
   * @see {@linkcode ChangelogOperation}
   * @see {@linkcode ChangelogStream}
   *
   * @param {ChangelogStream<T>} payload - Event payload
   * @param {ChangelogOperation<T>} context - Event context
   */
  constructor(
    public readonly payload: ChangelogStream<T>,
    public readonly context: ChangelogOperation<T>
  ) {}
}

export default ChangelogEvent
