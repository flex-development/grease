/**
 * @file Type Tests - TagOperationHandler
 * @module grease/git/operations/tests/unit-d/TagOperationHandler
 */

import type { ICommandHandler } from '@nestjs/cqrs'
import type TestSubject from '../tag.handler'
import type TagOperation from '../tag.operation'

describe('unit-d:git/operations/TagOperationHandler', () => {
  it('should implement ICommandHandler<TagOperation, TagOperation>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<TagOperation, TagOperation>>()
  })
})
