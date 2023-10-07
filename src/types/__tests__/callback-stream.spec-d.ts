/**
 * @file Type Tests - StreamCallback
 * @module grease/types/tests/unit-d/StreamCallback
 */

import type { Fn, Nullable } from '@flex-development/tutils'
import type TestSubject from '../callback-stream'

describe('unit-d:types/StreamCallback', () => {
  type T = RangeError

  it('should equal Fn<[Nullable<T>?], void>', () => {
    expectTypeOf<TestSubject<T>>().toEqualTypeOf<Fn<[Nullable<T>?], void>>()
  })
})
