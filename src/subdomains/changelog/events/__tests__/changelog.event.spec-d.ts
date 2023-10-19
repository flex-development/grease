/**
 * @file Type Tests - ChangelogEvent
 * @module grease/changelog/events/tests/unit-d/ChangelogEvent
 */

import type { ChangelogStream } from '#src/changelog/models'
import type { ChangelogOperation } from '#src/changelog/operations'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../changelog.event'

describe('unit-d:changelog/events/ChangelogEvent', () => {
  it('should match [readonly context: ChangelogOperation<T>]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'context'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('context')
      .toEqualTypeOf<ChangelogOperation>()
  })

  it('should match [readonly payload: ChangelogStream<T>]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'payload'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<ChangelogStream>()
  })
})
