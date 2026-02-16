/**
 * @file Type Tests - Awaitable
 * @module grease-util-types/tests/unit-d/Awaitable
 */

import type TestSubject from '#lib/awaitable'
import type { UserConfig } from '@flex-development/grease-util-types'

describe('unit-d:Awaitable', () => {
  type T = UserConfig | null | undefined

  it('should extract PromiseLike<T>', () => {
    expectTypeOf<TestSubject<T>>().extract<PromiseLike<T>>().not.toBeNever()
  })

  it('should extract T', () => {
    expectTypeOf<TestSubject<T>>().extract<T>().not.toBeNever()
  })
})
