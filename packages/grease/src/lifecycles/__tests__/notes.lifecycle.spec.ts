import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL
} from '@grease/config/constants.config'
import CreateNotesDTO from '@grease/dtos/create-notes.dto'
import { NotesType } from '@grease/enums/notes-type.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import changelogVersions from '@grease/utils/changelog-versions.util'
import { RELEASE_NOTES, VERSIONS } from '@tests/fixtures/changelog.fixture'
import type { Testcase } from '@tests/utils/types'
import { mocked } from 'ts-jest/utils'
import TestSubject from '../notes.lifecycle'

/**
 * @file Unit Tests - Notes
 * @module grease/lifecycles/tests/unit/Notes
 */

jest.mock('@grease/utils/changelog-versions.util')

const mockChangelogVersions = mocked(changelogVersions)

describe('unit:lifecycles/notes', () => {
  const dto: CreateNotesDTO = {
    infile: '__tests__/__fixtures__/CHANGELOG.fixture.md',
    type: NotesType.CHANGELOG,
    version: '2.0.0'
  }

  describe('returns', () => {
    type Case = Testcase<NullishString> & {
      dto: CreateNotesDTO
      options?: GreaseOptions
      state: string
      expected_string:
        | `${'birthday' | 'blank' | 'changelog'} notes`
        | NotesType.NULL
    }

    const cases: Case[] = [
      {
        dto: {},
        expected: GREASER_NOTES_NULL,
        expected_string: NotesType.NULL,
        options: { skip: { notes: true } },
        state: 'options.skip.notes === true'
      },
      {
        dto: { type: NotesType.BIRTHDAY },
        expected: GREASER_NOTES_BIRTHDAY,
        expected_string: 'birthday notes',
        state: 'dto.type === NotesType.BIRTHDAY'
      },
      {
        dto: {},
        expected: GREASER_NOTES_BIRTHDAY,
        expected_string: 'birthday notes',
        options: { firstRelease: true },
        state: 'options.firstRelease === true'
      },
      {
        dto: { type: NotesType.BLANK },
        expected: GREASER_NOTES_BLANK,
        expected_string: 'blank notes',
        state: 'dto.type === NotesType.BLANK'
      },
      {
        dto,
        expected: RELEASE_NOTES['2.0.0'],
        expected_string: 'changelog notes',
        state: 'dto.type === NotesType.CHANGELOG'
      },
      {
        dto: { type: NotesType.NULL },
        expected: GREASER_NOTES_NULL,
        expected_string: NotesType.NULL,
        state: 'dto.type === NotesType.NULL'
      }
    ]

    const name = 'should return $expected_string if $state'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { dto, expected, options } = testcase

      mockChangelogVersions.mockReturnValue(VERSIONS)

      // Act + Expect
      expect(await TestSubject(options, dto)).toBe(expected)
    })
  })

  describe('throws', () => {
    it('should throw if no package versions found in dto.infile', async () => {
      // Arrange
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue([])

      // Act
      try {
        await TestSubject({}, dto)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { dto, versions: [] },
        errors: { infile: dto.infile },
        message: `No package versions found in ${dto.infile}`
      })
    })

    it('should throw if dto.version not found in dto.infile', async () => {
      // Arrange
      const versions = VERSIONS.slice(1, 3)
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue(versions)

      // Act
      try {
        await TestSubject({}, dto)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { dto, versions },
        errors: { version: dto.version },
        message: `${dto.version} not found in ${dto.infile}`
      })
    })
  })
})
