/**
 * @file Type Tests - CommitQuery
 * @module grease/git/queries/tests/unit-d/CommitQuery
 */

import type { GitOptions } from '#src/git/options'
import type { CommitConstructor } from '#src/git/types'
import type TestSubject from '../commit.query'

describe('unit-d:git/queries/CommitQuery', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [Commit: CommitConstructor<T>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('Commit')
      .toEqualTypeOf<CommitConstructor>()
  })

  it('should match [actions: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('actions')
      .toEqualTypeOf<string[]>()
  })

  it('should match [from: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('from').toEqualTypeOf<string>()
  })

  it('should match [issues: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('issues')
      .toEqualTypeOf<string[]>()
  })

  it('should match [pr: string[]]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('pr').toEqualTypeOf<string[]>()
  })

  it('should match [to: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('to').toEqualTypeOf<string>()
  })
})
