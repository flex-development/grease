/**
 * @file Type Tests - TagQuery
 * @module grease/git/queries/tests/unit-d/TagQuery
 */

import type { GitOptions } from '#src/git/options'
import type TestSubject from '../tag.query'

describe('unit-d:git/queries/TagQuery', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [sort: string[]]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('sort').toEqualTypeOf<string[]>()
  })
})
