/**
 * @file Events - ChangelogEvent
 * @module grease/changelog/events/ChangelogEvent
 */

import type { ChangelogStream } from '#src/changelog/models'
import type { Commit } from '#src/git'
import type { IEvent } from '#src/interfaces'
import type { GlobalOptions } from '#src/options'

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
   * @see {@linkcode ChangelogStream}
   * @see {@linkcode GlobalOptions}
   *
   * @param {ChangelogStream<T>} payload - Event payload
   * @param {GlobalOptions} context - Event context
   */
  constructor(
    public payload: ChangelogStream<T>,
    public context: GlobalOptions
  ) {}
}

export default ChangelogEvent
