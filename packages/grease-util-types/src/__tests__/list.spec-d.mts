/**
 * @file Type Tests - List
 * @module grease-util-types/tests/unit-d/List
 */

import type TestSubject from '#lib/list'

describe('unit-d:List', () => {
  type T = string
  type Subject = TestSubject<T>

  it('should allow Set<T>', () => {
    expectTypeOf<Set<T>>().toExtend<Subject>()
  })

  it('should allow T[]', () => {
    expectTypeOf<T[]>().toExtend<Subject>()
  })

  it('should extract ReadonlySet<T>', () => {
    expectTypeOf<Subject>().extract<ReadonlySet<T>>().not.toBeNever()
  })

  it('should extract readonly T[]', () => {
    expectTypeOf<Subject>().extract<readonly T[]>().not.toBeNever()
  })
})
