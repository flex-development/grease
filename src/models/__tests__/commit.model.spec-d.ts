/**
 * @file Type Tests - Commit
 * @module grease/models/tests/unit-d/Commit
 */

import type { ICommit } from '#src/interfaces'
import type CommitGrammar from '../commit-grammar.model'
import type TestSubject from '../commit.model'

describe('unit-d:models/Commit', () => {
  it('should implement ICommit', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ICommit>()
  })

  it('should match [grammar: CommitGrammar]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('grammar')
      .toEqualTypeOf<CommitGrammar>()
  })
})
