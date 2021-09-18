import type { Path, PathValue } from '@flex-development/tutils'
import { GREASER_TITLE_BIRTHDAY } from '@grease/config/constants.config'
import type { ICreateReleaseDTO } from '@grease/interfaces'
import DTO from '@grease/tests/fixtures/create-release-dto.fixture'
import type { Testcase } from '@tests/utils/types'
import TestSubject from '../create-release.dto'

/**
 * @file Unit Tests - CreateReleaseDTO
 * @module grease/dtos/tests/unit/CreateRelease
 */

describe('unit:dtos/CreateReleaseDTO', () => {
  describe('#constructor', () => {
    describe('#title', () => {
      type Case = Testcase<NonNullable<ICreateReleaseDTO['title']>> & {
        state: string
        title: ICreateReleaseDTO['title']
        version: ICreateReleaseDTO['version']
      }

      const version1: ICreateReleaseDTO['version'] = 'v1.0.0'
      const version2: ICreateReleaseDTO['version'] = 'v2.0.0'

      const cases: Case[] = [
        {
          expected: `${version1} ${GREASER_TITLE_BIRTHDAY}`,
          state: `!data.title && data.version === ${version1}`,
          title: '',
          version: version1
        },
        {
          expected: version2,
          state: `!data.title && data.version === ${version2}`,
          title: undefined,
          version: version2
        },
        {
          expected: `${version2} 😄`,
          state: `data.title && data.version === ${version2}`,
          title: `${version2} 😄`,
          version: version2
        }
      ]

      it.each<Case>(cases)('should be $expected if $state', testcase => {
        // Arrange
        const { expected, title, version } = testcase

        // Act + Expect
        expect(new TestSubject({ title, version }).title).toBe(expected)
      })
    })
  })

  describe('#toStringArgs', () => {
    it('should return string[] where each string is non-empty', () => {
      // Act
      const result = new TestSubject(DTO).toStringArgs()

      // Expect
      result.forEach(value => {
        expect(value).toBeString()
        expect(value.length).not.toBe(0)
      })
    })

    describe('arguments', () => {
      type Case = Testcase<string[]> & {
        prop: keyof ICreateReleaseDTO
        value: PathValue<ICreateReleaseDTO, Path<ICreateReleaseDTO>>
      }

      const cases: Case[] = [
        { expected: ['--draft'], prop: 'draft', value: DTO.draft },
        {
          expected: [`${DTO.files?.[0]}`, `'${DTO.files?.[1]}'`],
          prop: 'files',
          value: DTO.files
        },
        {
          expected: [`--notes '${DTO.notes}'`],
          prop: 'notes',
          value: DTO.notes
        },
        {
          expected: ['--notes-file ./NOTES.md'],
          prop: 'notesFile',
          value: './NOTES.md'
        },
        { expected: ['--prerelease'], prop: 'prerelease', value: true },
        { expected: [`--repo ${DTO.repo}`], prop: 'repo', value: DTO.repo },
        {
          expected: [`--target ${DTO.target}`],
          prop: 'target',
          value: DTO.target
        },
        {
          expected: [`--title ${DTO.version}`],
          prop: 'title',
          value: DTO.title
        },
        { expected: [DTO.version], prop: 'version', value: DTO.version }
      ]

      it.each<Case>(cases)('should include $prop argument', testcase => {
        // Arrange
        const { expected, prop, value } = testcase
        const data = { [prop]: value }
        if (prop !== 'version') data.version = DTO.version

        // Act
        const result = new TestSubject(data).toStringArgs()

        // Expect
        expect(result).toIncludeAllMembers(expected)
      })
    })
  })
})
