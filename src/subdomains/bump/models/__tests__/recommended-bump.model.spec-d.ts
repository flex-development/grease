/**
 * @file Type Tests - RecommendedBump
 * @module grease/bump/models/tests/unit-d/RecommendedBump
 */

import type { IRecommendedBump } from '#src/bump/interfaces'
import type TestSubject from '../recommended-bump.model'

describe('unit-d:bump/models/RecommendedBump', () => {
  it('should implement IRecommendedBump', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IRecommendedBump>()
  })
})
