/**
 * @file Type Tests - ChangelogOperationHandler
 * @module grease/changelog/operations/tests/unit-d/ChangelogOperationHandler
 */

import type { ChangelogStream } from '#src/changelog/models'
import type { ICommandHandler } from '@nestjs/cqrs'
import type TestSubject from '../changelog.handler'
import type ChangelogOperation from '../changelog.operation'

describe('unit-d:changelog/operations/ChangelogOperationHandler', () => {
  it('should implement ICommandHandler<ChangelogOperation, ChangelogStream>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<ICommandHandler<ChangelogOperation, ChangelogStream>>()
  })
})
