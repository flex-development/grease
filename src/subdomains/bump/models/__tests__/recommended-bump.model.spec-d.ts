/**
 * @file Type Tests - RecommendedBump
 * @module grease/bump/models/tests/unit-d/RecommendedBump
 */

import type { ReleaseType } from '#src/enums'
import type TestSubject from '../recommended-bump.model'

describe('unit-d:bump/models/RecommendedBump', () => {
  it('should match [breaks: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('breaks').toEqualTypeOf<number>()
  })

  it('should match [bump: Extract<ReleaseType, "major" | "minor" | "patch">', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('bump')
      .toEqualTypeOf<Extract<ReleaseType, 'major' | 'minor' | 'patch'>>()
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
})
