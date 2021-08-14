import pkg from '@/grease/package.json'
import cache from '@grease/config/cache.config'
import { GREASER_TITLE_BIRTHDAY } from '@grease/config/constants.config'
import type { ICreateReleaseDTO, IGreaseCache } from '@grease/interfaces'
import type { GitSemverTagsOptions } from '@grease/types'
import TAGS from '@tests/fixtures/git-tags.fixture'
import type { Testcase } from '@tests/utils/types'
import faker from 'faker'
import join from 'lodash/join'
import TestSubject from '../create-release.dto'

/**
 * @file Unit Tests - CreateReleaseDTO
 * @module grease/dtos/tests/unit/CreateRelease
 */

jest.mock('@grease/config/cache.config')

const mockCache = cache as jest.Mocked<IGreaseCache>

describe('unit:dtos/CreateReleaseDTO', () => {
  describe('#toString', () => {
    type Case = Testcase<string> & {
      dto: Partial<ICreateReleaseDTO>
      git: GitSemverTagsOptions
      property:
        | `#${keyof ICreateReleaseDTO}`
        | `release tag${' (lerna-style)' | ''}`
        | `title if #version ${'satisfies' | 'does not satisfy'} 1.0.0`
      stringify: 'stringify' | 'not stringify'
    }

    const V1TAG = TAGS[TAGS.length - 1]
    const files: string[] = ['CHANGELOG.md', 'LICENSE.md']
    const notes = faker.lorem.words(5)
    const notesFile = 'RELEASE_NOTES.md'
    const target = 'main'
    const tag0 = TAGS[0]
    const repo = pkg.homepage.replace('https://', '')

    const expected = `${tag0} --title "${tag0}"`

    const cases: Case[] = [
      {
        dto: { files, version: tag0 },
        expected: `${tag0} ${join(files, ' ')} --title "${tag0}"`,
        git: {},
        property: '#files',
        stringify: 'stringify'
      },
      {
        dto: { files: [], version: tag0 },
        expected,
        git: {},
        property: '#files',
        stringify: 'not stringify'
      },
      {
        dto: { draft: true, version: tag0 },
        expected: `${tag0} --draft --title "${tag0}"`,
        git: {},
        property: '#draft',
        stringify: 'stringify'
      },
      {
        dto: { draft: false, version: tag0 },
        expected,
        git: {},
        property: '#draft',
        stringify: 'not stringify'
      },
      {
        dto: { notes, version: tag0 },
        expected: `${expected} --notes "${notes}"`,
        git: {},
        property: '#notes',
        stringify: 'stringify'
      },
      {
        dto: { notes: '', version: tag0 },
        expected,
        git: {},
        property: '#notes',
        stringify: 'not stringify'
      },
      {
        dto: { notesFile, version: tag0 },
        expected: `${expected} --notes-file ${notesFile}`,
        git: {},
        property: '#notesFile',
        stringify: 'stringify'
      },
      {
        dto: { notesFile: '', version: tag0 },
        expected,
        git: {},
        property: '#notesFile',
        stringify: 'not stringify'
      },
      {
        dto: { prerelease: true, version: tag0 },
        expected: `${tag0} --prerelease --title "${tag0}"`,
        git: {},
        property: '#prerelease',
        stringify: 'stringify'
      },
      {
        dto: { prerelease: false, version: tag0 },
        expected,
        git: {},
        property: '#prerelease',
        stringify: 'not stringify'
      },
      {
        dto: { target, version: tag0 },
        expected: `${expected} --target ${target}`,
        git: {},
        property: '#target',
        stringify: 'stringify'
      },
      {
        dto: { target: '', version: tag0 },
        expected,
        git: {},
        property: '#target',
        stringify: 'not stringify'
      },
      {
        dto: { repo, version: tag0 },
        expected: `${expected} --repo ${repo}`,
        git: {},
        property: '#repo',
        stringify: 'stringify'
      },
      {
        dto: { repo: '', version: tag0 },
        expected,
        git: {},
        property: '#repo',
        stringify: 'not stringify'
      },
      {
        dto: { version: V1TAG },
        expected: `${V1TAG} --title "${V1TAG} ${GREASER_TITLE_BIRTHDAY}"`,
        git: {},
        property: 'title if #version satisfies 1.0.0',
        stringify: 'stringify'
      },
      {
        dto: { title: tag0, version: tag0 },
        expected,
        git: {},
        property: 'title if #version does not satisfy 1.0.0',
        stringify: 'stringify'
      },
      {
        dto: { title: '', version: tag0 },
        expected,
        git: {},
        property: '#title',
        stringify: 'not stringify'
      }
    ]

    it.each<Case>(cases)('should $stringify $property', testcase => {
      // Arrange
      const { dto, expected, git } = testcase

      // @ts-expect-error read-only property - mocking
      mockCache.git = git

      // Act + Expect
      expect(Object.assign(new TestSubject(), dto).toString()).toBe(expected)
    })
  })
})
