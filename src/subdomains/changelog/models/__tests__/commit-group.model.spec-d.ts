/**
 * @file Type Tests - CommitGroup
 * @module grease/changelog/models/tests/unit-d/CommitGroup
 */

import type { ICommitGroup } from '#src/changelog/interfaces'
import type { Commit } from '#src/git'
import type TestSubject from '../commit-group.model'

describe('unit-d:changelog/models/CommitGroup', () => {
  it('should implement ICommitGroup<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ICommitGroup<Commit>>()
  })
})
