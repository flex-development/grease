import pkg from '@/grease/package.json'
import type {
  GitSemverTagsOptions,
  SemanticVersion,
  SemVerOptions
} from '@grease/types'
import { OPTIONS_LERNA } from '@tests/fixtures/git-tags.fixture'
import { mockGitTags, stringCompare } from '@tests/utils'
import type { Testcase } from '@tests/utils/types'
import TestSubject from '../semver'

/**
 * @file Unit Tests - semver
 * @module grease/utils/tests/unit/semver
 */

describe('unit:utils/semver', () => {
  describe('.clean', () => {
    type Case = Testcase<SemanticVersion | null> & {
      options?: SemVerOptions
      tagPrefix?: string
      version: any
    }

    const VERSION = pkg.version as SemanticVersion

    const cases: Case[] = [
      {
        expected: VERSION,
        options: undefined,
        tagPrefix: undefined,
        version: `v${pkg.version}`
      },
      {
        expected: VERSION,
        options: undefined,
        tagPrefix: '@',
        version: `${OPTIONS_LERNA.package}@${pkg.version}`
      },
      {
        expected: null,
        options: undefined,
        tagPrefix: undefined,
        version: `${OPTIONS_LERNA.package}@${pkg.version}`
      },
      {
        expected: null,
        options: undefined,
        tagPrefix: undefined,
        version: [1]
      }
    ]

    it.each<Case>(cases)('clean($version, $tagPrefix, $options)', testcase => {
      // Arrange
      const { expected, options, tagPrefix, version } = testcase

      // Act + Expect
      expect(TestSubject.clean(version, tagPrefix, options)).toBe(expected)
    })
  })

  describe('.tags', () => {
    type Case = Testcase<string[]> & {
      options?: GitSemverTagsOptions
      reverse?: boolean
    }

    const tags = mockGitTags()
    const tagsLerna = mockGitTags(OPTIONS_LERNA)

    const cases: Case[] = [
      {
        expected: tags,
        options: {},
        reverse: true
      },
      {
        expected: tags.sort(stringCompare),
        options: {},
        reverse: false
      },
      {
        expected: tagsLerna,
        options: OPTIONS_LERNA,
        reverse: true
      },
      {
        expected: tagsLerna.sort(stringCompare),
        options: OPTIONS_LERNA,
        reverse: false
      }
    ]

    it.each<Case>(cases)('tags($options, $reverse)', testcase => {
      // Arrange
      const { expected, options, reverse } = testcase

      // Act + Expect
      expect(TestSubject.tags(options, reverse)).toIncludeSameMembers(expected)
    })
  })
})
