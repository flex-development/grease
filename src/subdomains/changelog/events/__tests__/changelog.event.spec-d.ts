/**
 * @file Type Tests - ChangelogEvent
 * @module grease/changelog/events/tests/unit-d/ChangelogEvent
 */

import type { ChangelogStream } from '#src/changelog/models'
import type { GlobalOptions } from '#src/options'
import type TestSubject from '../changelog.event'

describe('unit-d:changelog/events/ChangelogEvent', () => {
  it('should match [context: GlobalOptions]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('context')
      .toEqualTypeOf<GlobalOptions>()
  })

  it('should match [payload: ChangelogStream<T>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<ChangelogStream>()
  })
})
