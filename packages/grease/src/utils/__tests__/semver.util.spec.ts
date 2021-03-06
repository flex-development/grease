import pkg from '@/grease/package.json'
import { TAGS_OPTIONS_LERNA } from '@grease/tests/fixtures/git-tags.fixture'
import { mockGitTags } from '@grease/tests/utils'
import type {
  GitSemverTagsOptions,
  SemanticVersion,
  SemVerOptions
} from '@grease/types'
import { stringCompare } from '@tests/utils'
import type { Testcase } from '@tests/utils/types'
import TestSubject from '../semver.util'

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
        version: `${TAGS_OPTIONS_LERNA.package}@${pkg.version}`
      },
      {
        expected: null,
        options: undefined,
        tagPrefix: undefined,
        version: `${TAGS_OPTIONS_LERNA.package}@${pkg.version}`
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
    const tagsLerna = mockGitTags(TAGS_OPTIONS_LERNA)

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
        options: TAGS_OPTIONS_LERNA,
        reverse: true
      },
      {
        expected: tagsLerna.sort(stringCompare),
        options: TAGS_OPTIONS_LERNA,
        reverse: false
      }
    ]

    it.each<Case>(cases)('tags($options, $reverse)', async testcase => {
      // Arrange
      const { expected, options, reverse } = testcase

      // Act
      const result = await TestSubject.tags(options, reverse)

      // Act + Expect
      expect(result).toIncludeSameMembers(expected)
    })
  })
})
