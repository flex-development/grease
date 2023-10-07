/**
 * @file Type Tests - ChangelogFormatter
 * @module grease/changelog/models/tests/unit-d/ChangelogFormatter
 */

import type AbstractChangelogFormatter from '../changelog-formatter.abstract'
import type TestSubject from '../changelog-formatter.model'

describe('unit-d:changelog/models/ChangelogFormatter', () => {
  it('should extend AbstractChangelogFormatter<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<AbstractChangelogFormatter>()
  })
})
