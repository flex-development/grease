/**
 * @file Type Tests - GitTagOptions
 * @module grease/options/tests/unit-d/GitTagOptions
 */

import type TestSubject from '../git-tag.options'
import type GitOptions from '../git.options'

describe('unit-d:options/GitTagOptions', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [tagprefix: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tagprefix')
      .toEqualTypeOf<string>()
  })

  it('should match [unstable: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('unstable')
      .toEqualTypeOf<boolean>()
  })
})
