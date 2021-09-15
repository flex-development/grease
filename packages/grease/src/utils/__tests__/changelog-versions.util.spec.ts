import type { NullishString } from '@flex-development/tutils'
import CHANGELOG, { VERSIONS } from '@grease/tests/fixtures/changelog.fixture'
import type { SemanticVersion } from '@grease/types'
import type { Testcase } from '@tests/utils/types'
import testSubject from '../changelog-versions.util'

/**
 * @file Unit Tests - changelogVersions
 * @module grease/utils/tests/unit/changelogVersions
 */

describe('unit:utils/changelogVersions', () => {
  type Case = Testcase<SemanticVersion[]> & {
    changelog: NullishString | undefined
    state:
      | 'has no headings'
      | 'is empty string'
      | 'is null'
      | 'is undefined'
      | 'is valid'
    type: 'empty' | 'versions'
  }

  const cases: Case[] = [
    {
      changelog: CHANGELOG,
      expected: VERSIONS,
      state: 'is valid',
      type: 'versions'
    },
    {
      changelog: CHANGELOG.replaceAll('#', ''),
      expected: [],
      state: 'has no headings',
      type: 'empty'
    },
    { changelog: '', expected: [], state: 'is empty string', type: 'empty' },
    { changelog: null, expected: [], state: 'is null', type: 'empty' },
    { changelog: undefined, expected: [], state: 'is undefined', type: 'empty' }
  ]

  const name = 'should return $type array if changelog $state'

  it.each<Case>(cases)(name, testcase => {
    // Arrange
    const { changelog, expected } = testcase

    // Act
    const result = testSubject(changelog)

    // Expect
    expect(result).toIncludeSameMembers(expected)
  })
})
