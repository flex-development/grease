/**
 * @file Type Tests - GitCommitOptions
 * @module grease/git/options/tests/unit-d/GitCommitOptions
 */

import type { CommitConstructor } from '#src/git/types'
import type TestSubject from '../git-commit.options'
import type GitOptions from '../git.options'

describe('unit-d:git/options/GitCommitOptions', () => {
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
