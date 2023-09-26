/**
 * @file Type Tests - BreakingChange
 * @module grease/git/types/tests/unit-d/BreakingChange
 */

import type { Commit } from '#src/git/models'
import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../breaking-change'

describe('unit-d:git/types/BreakingChange', () => {
  it('should match [commit: T]', () => {
    expectTypeOf<TestSubject<Commit>>()
      .toHaveProperty('commit')
      .toEqualTypeOf<Commit>()
  })

  it('should match [mentions: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mentions')
      .toEqualTypeOf<string[]>()
  })

  it('should match [pr: Nullable<number>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('pr')
      .toEqualTypeOf<Nullable<number>>()
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
