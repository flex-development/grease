/**
 * @file Type Tests - BumpEventListener
 * @module grease/bump/events/tests/unit-d/BumpEventListener
 */

import type { IEventHandler } from '@nestjs/cqrs'
import type BumpEvent from '../bump.event'
import type TestSubject from '../bump.listener'

describe('unit-d:bump/events/BumpEventListener', () => {
  it('should implement IEventHandler<BumpEvent>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IEventHandler<BumpEvent>>()
  })
})
