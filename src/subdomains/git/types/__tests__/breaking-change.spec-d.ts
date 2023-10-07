/**
 * @file Type Tests - BreakingChange
 * @module grease/git/types/tests/unit-d/BreakingChange
 */

import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../breaking-change'

describe('unit-d:git/types/BreakingChange', () => {
  it('should match [date: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('date').toEqualTypeOf<string>()
  })

  it('should match [scope: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('scope')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [subject: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('subject')
      .toEqualTypeOf<string>()
  })

  it('should match [type: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('type').toEqualTypeOf<string>()
  })
})
