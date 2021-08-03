import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL
} from '@grease/config/constants.config'
import CreateGreaseNotesDTO from '@grease/dtos/create-grease-notes.dto'
import { GreaseNotesType } from '@grease/enums/grease-notes-type.enum'
import changelogVersions from '@grease/utils/changelog-versions.util'
import { RELEASE_NOTES, VERSIONS } from '@tests/fixtures/changelog.fixture'
import type { Testcase } from '@tests/utils/types'
import { mocked } from 'ts-jest/utils'
import TestSubject from '../grease-notes.lifecycle'

/**
 * @file Unit Tests - Grease Notes
 * @module grease/lifecycles/tests/unit/GreaseNotes
 */

jest.mock('@grease/utils/changelog-versions.util')

const mockChangelogVersions = mocked(changelogVersions)

describe('unit:lifecycles/grease-notes', () => {
  const dto: CreateGreaseNotesDTO = {
    changelog: '__tests__/__fixtures__/CHANGELOG.fixture.md',
    type: GreaseNotesType.CHANGELOG,
    version: '2.0.0'
  }

  describe('returns', () => {
    type Case = Testcase<NullishString> & {
      dto: CreateGreaseNotesDTO
      state: string
      expected_string:
        | `${'birthday' | 'blank' | 'changelog'} notes`
        | GreaseNotesType.NULL
    }

    const cases: Case[] = [
      {
        dto: { type: GreaseNotesType.BIRTHDAY },
        expected: GREASER_NOTES_BIRTHDAY,
        state: 'dto.type === GreaseNotesType.BIRTHDAY',
        expected_string: 'birthday notes'
      },
      {
        dto: { version: '1.0.0' },
        expected: GREASER_NOTES_BIRTHDAY,
        expected_string: 'birthday notes',
        state: 'dto.version satisfies 1.0.0'
      },
      {
        dto: { type: GreaseNotesType.BLANK },
        expected: GREASER_NOTES_BLANK,
        expected_string: 'blank notes',
        state: 'dto.type === GreaseNotesType.BLANK'
      },
      {
        dto,
        expected: RELEASE_NOTES['2.0.0'],
        expected_string: 'changelog notes',
        state: 'dto.type === GreaseNotesType.CHANGELOG'
      },
      {
        dto: { type: GreaseNotesType.NULL },
        expected: GREASER_NOTES_NULL,
        expected_string: GreaseNotesType.NULL,
        state: 'dto.type === GreaseNotesType.NULL'
      }
    ]

    const name = 'should return $expected_string if $state'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { dto, expected } = testcase

      mockChangelogVersions.mockReturnValue(VERSIONS)

      // Act + Expect
      expect(await TestSubject(dto)).toBe(expected)
    })
  })

  describe('throws', () => {
    it('should throw if no package versions found in changelog', async () => {
      // Arrange
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue([])

      // Act
      try {
        await TestSubject(dto)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { dto, versions: [] },
        errors: { changelog: dto.changelog },
        message: `No package versions found in ${dto.changelog}`
      })
    })

    it('should throw if dto.version not found in changelog', async () => {
      // Arrange
      const versions = VERSIONS.slice(1, 3)
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue(versions)

      // Act
      try {
        await TestSubject(dto)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { dto, versions },
        errors: { version: dto.version },
        message: `${dto.version} not found in ${dto.changelog}`
      })
    })
  })
})
