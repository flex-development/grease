/**
 * @file Type Tests - ChangelogQueryHandler
 * @module grease/changelog/queries/tests/unit-d/ChangelogQueryHandler
 */

import type { ChangelogEntry } from '#src/changelog/models'
import type { IQueryHandler } from '@nestjs/cqrs'
import type TestSubject from '../changelog.handler'
import type ChangelogQuery from '../changelog.query'

describe('unit-d:changelog/queries/ChangelogQueryHandler', () => {
  it('should implement IQueryHandler<ChangelogQuery, ChangelogEntry[]>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<IQueryHandler<ChangelogQuery, ChangelogEntry[]>>()
  })
})
