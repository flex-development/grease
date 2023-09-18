/**
 * @file Type Tests - RepositoryProvider
 * @module grease/enums/tests/unit-d/RepositoryProvider
 */

import type TestSubject from '../repository-provider'

describe('unit-d:enums/RepositoryProvider', () => {
  it('should match [BITBUCKET = "bitbucket"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('BITBUCKET')
      .toMatchTypeOf<'bitbucket'>()
  })

  it('should match [GITHUB = "github"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('GITHUB')
      .toMatchTypeOf<'github'>()
  })

  it('should match [GITLAB = "gitlab"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('GITLAB')
      .toMatchTypeOf<'gitlab'>()
  })
})
