/**
 * @file Type Tests - ChangelogEntry
 * @module grease/changelog/models/tests/unit-d/ChangelogEntry
 */

import type { IChangelogEntry } from '#src/changelog/interfaces'
import type { Commit } from '#src/git'
import type TestSubject from '../changelog-entry.model'

describe('unit-d:changelog/models/ChangelogEntry', () => {
  it('should implement IChangelogEntry<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IChangelogEntry<Commit>>()
  })
})
