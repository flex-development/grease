/**
 * @file Type Tests - GitCommitOptions
 * @module grease/git/options/tests/unit-d/GitCommitOptions
 */

import type { CommitConstructor } from '#src/git/types'
import type CommitGrammarOptions from '../commit-grammar.options'
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

  it('should match [from: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('from').toEqualTypeOf<string>()
  })

  it('should match [grammar: Omit<CommitGrammarOptions, "provider" | "tagprefix">]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('grammar')
      .toEqualTypeOf<Omit<CommitGrammarOptions, 'provider' | 'tagprefix'>>()
  })

  it('should match [to: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('to').toEqualTypeOf<string>()
  })
})
