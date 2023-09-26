/**
 * @file Type Tests - RepositoryKeywords
 * @module grease/git/types/tests/unit-d/RepositoryKeywords
 */

import type TestSubject from '../repository-keywords'

describe('unit-d:git/types/RepositoryKeywords', () => {
  it('should match [commit: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('commit').toEqualTypeOf<string>()
  })

  it('should match [issue: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('issue').toEqualTypeOf<string>()
  })

  it('should match [pr: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('pr').toEqualTypeOf<string>()
  })
})
