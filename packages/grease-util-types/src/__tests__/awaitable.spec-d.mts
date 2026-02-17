/**
 * @file Type Tests - Awaitable
 * @module grease-util-types/tests/unit-d/Awaitable
 */

import type TestSubject from '#lib/awaitable'
import type { UserConfig } from '@flex-development/grease-util-types'

describe('unit-d:Awaitable', () => {
  type T = UserConfig | null | undefined
  type Subject = TestSubject<T>

  it('should extract PromiseLike<T>', () => {
    expectTypeOf<Subject>().extract<PromiseLike<T>>().not.toBeNever()
  })

  it('should extract T', () => {
    expectTypeOf<Subject>().extract<T>().not.toBeNever()
  })
})
