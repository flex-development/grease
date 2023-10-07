/**
 * @file Type Tests - Commit
 * @module grease/git/models/tests/unit-d/Commit
 */

import type { RepositoryProvider } from '#src/git/enums'
import type { ICommit } from '#src/git/interfaces'
import type { Stringafiable } from '@flex-development/tutils'
import type CommitGrammar from '../commit-grammar.model'
import type TestSubject from '../commit.model'
import type Repository from '../repository.model'

describe('unit-d:git/models/Commit', () => {
  it('should implement ICommit', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ICommit>()
  })

  it('should implement Stringafiable', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Stringafiable>()
  })

  it('should match [grammar: CommitGrammar]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('grammar')
      .toEqualTypeOf<CommitGrammar>()
  })

  it('should match [provider: RepositoryProvider]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('provider')
      .toEqualTypeOf<RepositoryProvider>()
  })

  it('should match [repository: Repository]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('repository')
      .toEqualTypeOf<Repository>()
  })
})
