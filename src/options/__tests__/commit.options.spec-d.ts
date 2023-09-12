/**
 * @file Type Tests - CommitOptions
 * @module grease/options/tests/unit-d/CommitOptions
 */

import TestSubject from '../commit.options'
import type GitOptions from '../git.options'

describe('unit-d:options/CommitOptions', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [from: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('from').toEqualTypeOf<string>()
  })

  it('should match [issue_prefixes: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('issue_prefixes')
      .toEqualTypeOf<string[]>()
  })

  it('should match [to: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('to').toEqualTypeOf<string>()
  })
})
