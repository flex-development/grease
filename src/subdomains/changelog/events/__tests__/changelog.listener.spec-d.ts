/**
 * @file Type Tests - ChangelogEventListener
 * @module grease/changelog/events/tests/unit-d/ChangelogEventListener
 */

import type { IEventHandler } from '@nestjs/cqrs'
import type ChangelogEvent from '../changelog.event'
import type TestSubject from '../changelog.listener'

describe('unit-d:changelog/events/ChangelogEventListener', () => {
  it('should implement IEventHandler<ChangelogEvent>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IEventHandler<ChangelogEvent>>()
  })
})
