import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { NullishString } from '@flex-development/tutils'
import {
  GREASER_NOTES_BIRTHDAY,
  GREASER_NOTES_BLANK,
  GREASER_NOTES_NULL
} from '@grease/config/constants.config'
import { NotesType } from '@grease/enums/notes-type.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import type { SemanticVersion } from '@grease/types'
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
  const options: GreaseOptions = {
    infile: '__tests__/__fixtures__/CHANGELOG.fixture.md',
    notesType: NotesType.CHANGELOG
  }

  describe('returns', () => {
    type Case = Testcase<NullishString> & {
      expected_string:
        | `${'birthday' | 'blank' | 'changelog'} notes`
        | NotesType.NULL
      options: GreaseOptions
      state: string
      version: SemanticVersion | NullishString
    }

    const cases: Case[] = [
      {
        expected: GREASER_NOTES_NULL,
        expected_string: NotesType.NULL,
        options: { skip: { notes: true } },
        state: 'options.skip.notes === true',
        version: null
      },
      {
        expected: GREASER_NOTES_BIRTHDAY,
        expected_string: 'birthday notes',
        options: { notesType: NotesType.BIRTHDAY },
        state: 'options.notesType === NotesType.BIRTHDAY',
        version: '1.0.0-alpha'
      },
      {
        expected: GREASER_NOTES_BIRTHDAY,
        expected_string: 'birthday notes',
        options: { firstRelease: true },
        state: 'options.firstRelease === true',
        version: '1.0.0-beta'
      },
      {
        expected: GREASER_NOTES_BLANK,
        expected_string: 'blank notes',
        options: { notesType: NotesType.BLANK },
        state: 'options.notesType === NotesType.BLANK',
        version: '7.7.7'
      },
      {
        expected: RELEASE_NOTES['2.0.0'],
        expected_string: 'changelog notes',
        options,
        state: 'options.notesType === NotesType.CHANGELOG',
        version: '2.0.0'
      },
      {
        expected: GREASER_NOTES_NULL,
        expected_string: NotesType.NULL,
        options: { notesType: NotesType.NULL },
        state: 'options.notesType === NotesType.NULL',
        version: '1.1.5'
      }
    ]

    const name = 'should return $expected_string if $state'

    it.each<Case>(cases)(name, async testcase => {
      // Arrange
      const { expected, options, version } = testcase

      mockChangelogVersions.mockReturnValue(VERSIONS)

      // Act + Expect
      expect(await TestSubject(options, version)).toBe(expected)
    })
  })

  describe('throws', () => {
    it('should throw if no versions are found in options.infile', async () => {
      // Arrange
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue([])

      // Act
      try {
        await TestSubject(options, VERSIONS[VERSIONS.length - 2])
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { versions: [] },
        errors: { infile: options.infile },
        message: `No package versions found in ${options.infile}`
      })
    })

    it('should throw if version is not found in options.infile', async () => {
      // Arrange
      const versions = VERSIONS.slice(1, 3)
      const version = VERSIONS[VERSIONS.length - 3]
      let exception = {} as Exception
      mockChangelogVersions.mockReturnValue(versions)

      // Act
      try {
        await TestSubject(options, version)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.NOT_FOUND,
        data: { versions },
        errors: { version },
        message: `${version} not found in ${options.infile}`
      })
    })
  })
})
