import pkg from '@/grease/package.json'
import cache from '@grease/config/cache.config'
import { GREASER_TITLE_BIRTHDAY } from '@grease/config/constants.config'
import type { ICreateReleaseDTO, IGreaseCache } from '@grease/interfaces'
import type { GitSemverTagsOptions, SemanticVersion } from '@grease/types'
import TAGS, {
  TAGS_OPTIONS_LERNA as TOL
} from '@tests/fixtures/git-tags.fixture'
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
    const V1 = V1TAG.replace('v', '') as SemanticVersion
    const files: string[] = ['CHANGELOG.md', 'LICENSE.md']
    const notes = faker.lorem.words(5)
    const notesFile = 'RELEASE_NOTES.md'
    const tagPrefix = 'v'
    const target = 'main'
    const tag0 = TAGS[0]
    const version0 = tag0.replace('v', '') as SemanticVersion

    const cases: Case[] = [
      {
        dto: { tagPrefix, version: version0 },
        expected: tag0,
        git: {},
        property: 'release tag',
        stringify: 'stringify'
      },
      {
        dto: { tagPrefix: TOL.tagPrefix, version: version0 },
        expected: `${TOL.package}${TOL.tagPrefix}${version0}`,
        git: TOL,
        property: 'release tag (lerna-style)',
        stringify: 'stringify'
      },
      {
        dto: { files },
        expected: join(files, ' '),
        git: {},
        property: '#files',
        stringify: 'stringify'
      },
      {
        dto: { files: [] },
        expected: '',
        git: {},
        property: '#files',
        stringify: 'not stringify'
      },
      {
        dto: { draft: true },
        expected: '--draft',
        git: {},
        property: '#draft',
        stringify: 'stringify'
      },
      {
        dto: { draft: false },
        expected: '',
        git: {},
        property: '#draft',
        stringify: 'not stringify'
      },
      {
        dto: { notes },
        expected: `--notes ${notes}`,
        git: {},
        property: '#notes',
        stringify: 'stringify'
      },
      {
        dto: { notes: '' },
        expected: '',
        git: {},
        property: '#notes',
        stringify: 'not stringify'
      },
      {
        dto: { notesFile },
        expected: `--notes-file ${notesFile}`,
        git: {},
        property: '#notesFile',
        stringify: 'stringify'
      },
      {
        dto: { notesFile: '' },
        expected: '',
        git: {},
        property: '#notesFile',
        stringify: 'not stringify'
      },
      {
        dto: { prerelease: true },
        expected: '--prerelease',
        git: {},
        property: '#prerelease',
        stringify: 'stringify'
      },
      {
        dto: { prerelease: false },
        expected: '',
        git: {},
        property: '#prerelease',
        stringify: 'not stringify'
      },
      {
        dto: { target },
        expected: `--target ${target}`,
        git: {},
        property: '#target',
        stringify: 'stringify'
      },
      {
        dto: { target: '' },
        expected: '',
        git: {},
        property: '#target',
        stringify: 'not stringify'
      },
      {
        dto: { repo: pkg.homepage },
        expected: `--repo ${pkg.homepage}`,
        git: {},
        property: '#repo',
        stringify: 'stringify'
      },
      {
        dto: { repo: '' },
        expected: '',
        git: {},
        property: '#repo',
        stringify: 'not stringify'
      },
      {
        dto: { tagPrefix, version: V1 },
        expected: `${V1TAG} --title ${V1TAG} ${GREASER_TITLE_BIRTHDAY}`,
        git: {},
        property: 'title if #version satisfies 1.0.0',
        stringify: 'stringify'
      },
      {
        dto: { tagPrefix, title: tag0, version: version0 },
        expected: `${tag0} --title ${tag0}`,
        git: {},
        property: 'title if #version does not satisfy 1.0.0',
        stringify: 'stringify'
      },
      {
        dto: { title: '' },
        expected: '',
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
