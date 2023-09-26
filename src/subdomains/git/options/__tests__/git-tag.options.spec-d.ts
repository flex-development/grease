/**
 * @file Type Tests - GitTagOptions
 * @module grease/git/options/tests/unit-d/GitTagOptions
 */

import type TestSubject from '../git-tag.options'
import type GitOptions from '../git.options'

describe('unit-d:git/options/GitTagOptions', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [unstable: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('unstable')
      .toEqualTypeOf<boolean>()
  })
})
