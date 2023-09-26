/**
 * @file Type Tests - CommitGrammarOptions
 * @module grease/git/options/tests/unit-d/CommitGrammarOptions
 */

import type { RepositoryProvider } from '#src/git/enums'
import type TestSubject from '../commit-grammar.options'

describe('unit-d:git/options/CommitGrammarOptions', () => {
  it('should match [actions: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('actions')
      .toEqualTypeOf<string[]>()
  })

  it('should match [issues: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('issues')
      .toEqualTypeOf<string[]>()
  })

  it('should match [pr: string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('pr')
      .toEqualTypeOf<string[]>()
  })

  it('should match [provider: RepositoryProvider]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('provider')
      .toEqualTypeOf<RepositoryProvider>()
  })

  it('should match [tagprefix: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tagprefix')
      .toEqualTypeOf<string>()
  })
})
