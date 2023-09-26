/**
 * @file Type Tests - Repository
 * @module grease/git/models/tests/unit-d/Repository
 */

import type { RepositoryProvider } from '#src/git/enums'
import type {
  RepositoryHost,
  RepositoryKeywords
} from '#src/git/types'
import type TestSubject from '../repository.model'

describe('unit-d:git/models/Repository', () => {
  it('should match [host: RepositoryHost]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('host')
      .toEqualTypeOf<RepositoryHost>()
  })

  it('should match [keywords: RepositoryKeywords]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('keywords')
      .toEqualTypeOf<RepositoryKeywords>()
  })

  it('should match [owner: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('owner')
      .toEqualTypeOf<string>()
  })

  it('should match [provider: RepositoryProvider]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('provider')
      .toEqualTypeOf<RepositoryProvider>()
  })

  it('should match [repo: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('repo')
      .toEqualTypeOf<string>()
  })
})
