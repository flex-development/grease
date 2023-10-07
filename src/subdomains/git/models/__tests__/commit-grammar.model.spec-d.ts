/**
 * @file Type Tests - CommitGrammar
 * @module grease/git/models/tests/unit-d/CommitGrammar
 */

import type { CommitGrammarOptions } from '#src/git/options'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../commit-grammar.model'

describe('unit-d:git/models/CommitGrammar', () => {
  it('should match [readonly options: Readonly<CommitGrammarOptions>]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'options'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('options')
      .toEqualTypeOf<Readonly<CommitGrammarOptions>>()
  })
})
