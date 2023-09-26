/**
 * @file Type Tests - BumpEvent
 * @module grease/bump/events/tests/unit-d/BumpEvent
 */

import type { RecommendedBump } from '#src/bump/models'
import type { Manifest } from '#src/models'
import type { GlobalOptions } from '#src/options'
import type TestSubject from '../bump.event'

describe('unit-d:bump/events/BumpEvent', () => {
  it('should match [context: GlobalOptions]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('context')
      .toEqualTypeOf<GlobalOptions>()
  })

  it('should match [payload: Manifest | RecommendedBump]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<Manifest | RecommendedBump>()
  })
})
