/**
 * @file Type Tests - BumpOperationHandler
 * @module grease/bump/operations/tests/unit-d/BumpOperationHandler
 */

import type { Version } from '#src/models'
import type { ICommandHandler } from '@nestjs/cqrs'
import type TestSubject from '../bump.handler'
import type BumpOperation from '../bump.operation'

describe('unit-d:bump/operations/BumpOperationHandler', () => {
  it('should implement ICommandHandler<BumpOperation, Version>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<BumpOperation, Version>>()
  })
})
