/**
 * @file Type Tests - IEvent
 * @module grease/interfaces/tests/unit-d/IEvent
 */

import type { ObjectCurly } from '@flex-development/tutils'
import type TestSubject from '../event.interface'

describe('unit-d:interfaces/IEvent', () => {
  type T = ObjectCurly

  it('should match [payload: T]', () => {
    expectTypeOf<TestSubject<T>>().toHaveProperty('payload').toEqualTypeOf<T>()
  })
})
