/**
 * @file Type Tests - BumpQueryHandler
 * @module grease/bump/queries/tests/unit-d/BumpQueryHandler
 */

import type { RecommendedBump } from '#src/bump/models'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../bump.handler'
import type BumpQuery from '../bump.query'

describe('unit-d:bump/queries/BumpQueryHandler', () => {
  it('should implement IQueryHandler<BumpQuery, RecommendedBump>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<BumpQuery, RecommendedBump>>()
  })
})
