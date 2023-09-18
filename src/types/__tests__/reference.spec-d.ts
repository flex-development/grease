/**
 * @file Type Tests - Reference
 * @module grease/types/tests/unit-d/Reference
 */

import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../reference'

describe('unit-d:types/Reference', () => {
  it('should match [action: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('action')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [number: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('number')
      .toEqualTypeOf<number>()
  })

  it('should match [owner: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('owner')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [ref: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('ref').toEqualTypeOf<string>()
  })

  it('should match [repo: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('repo')
      .toEqualTypeOf<Nullable<string>>()
  })
})
