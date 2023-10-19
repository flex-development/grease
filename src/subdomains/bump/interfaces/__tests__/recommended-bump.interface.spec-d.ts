/**
 * @file Type Tests - IRecommendedBump
 * @module grease/bump/interfaces/tests/unit-d/IRecommendedBump
 */

import type { ReleaseType } from '#src/enums'
import type TestSubject from '../recommended-bump.interface'

describe('unit-d:bump/interfaces/IRecommendedBump', () => {
  it('should match [breaks: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('breaks').toEqualTypeOf<number>()
  })

  it('should match [bump: Exclude<ReleaseType, "prerelease">]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('bump')
      .toEqualTypeOf<Exclude<ReleaseType, 'prerelease'>>()
  })

  it('should match [commits: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('commits')
      .toEqualTypeOf<number>()
  })

  it('should match [features: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('features')
      .toEqualTypeOf<number>()
  })

  it('should match [unstable: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('unstable')
      .toEqualTypeOf<boolean>()
  })
})
