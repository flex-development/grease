/**
 * @file Type Tests - CommitConstructor
 * @module grease/git/types/tests/unit-d/CommitConstructor
 */

import type { Commit, Repository } from '#src/git/models'
import type { CommitGrammarOptions } from '#src/git/options'
import type { Partial } from '@flex-development/tutils'
import type TestSubject from '../commit-constructor'

describe('unit-d:git/types/CommitConstructor', () => {
  it('should be callable with [string, Repository, Partial<CommitGrammarOptions>]', () => {
    expectTypeOf<TestSubject>().constructorParameters.toEqualTypeOf<[
      chunk: string,
      repository?: Repository,
      grammar?: Partial<CommitGrammarOptions>
    ]>()
  })

  it('should construct T', () => {
    expectTypeOf<TestSubject>().instance.toEqualTypeOf<Commit>()
  })
})
