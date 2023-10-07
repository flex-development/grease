/**
 * @file Type Tests - CommitType
 * @module grease/changelog/models/tests/unit-d/CommitType
 */

import type { ICommitType } from '#src/changelog/interfaces'
import type TestSubject from '../commit-type.model'

describe('unit-d:changelog/models/CommitType', () => {
  it('should implement ICommitType', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ICommitType>()
  })
})
