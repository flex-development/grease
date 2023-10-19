/**
 * @file Type Tests - BumpEvent
 * @module grease/bump/events/tests/unit-d/BumpEvent
 */

import type { RecommendedBump } from '#src/bump/models'
import type { BumpOperation } from '#src/bump/operations'
import type { BumpQuery } from '#src/bump/queries'
import type { Version } from '#src/models'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../bump.event'

describe('unit-d:bump/events/BumpEvent', () => {
  it('should match [readonly context: BumpOperation | BumpQuery]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'context'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('context')
      .toEqualTypeOf<BumpOperation | BumpQuery>()
  })

  it('should match [readonly payload: RecommendedBump | Version]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'payload'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('payload')
      .toEqualTypeOf<RecommendedBump | Version>()
  })
})
