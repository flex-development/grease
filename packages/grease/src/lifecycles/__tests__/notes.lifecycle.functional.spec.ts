import logger from '@grease/config/logger.config'
import CreateNotesDTO from '@grease/dtos/create-notes.dto'
import { NotesType } from '@grease/enums/notes-type.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import validate from '@grease/utils/validate.util'
import TAGS from '@tests/fixtures/git-tags.fixture'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../notes.lifecycle'

/**
 * @file Functional Tests - Notes
 * @module grease/lifecycles/tests/functional/Notes
 */

jest.mock('@grease/config/logger.config')
jest.mock('@grease/utils/validate.util')

const mockSH = sh as jest.Mocked<typeof sh>
const mockLogger = logger as jest.Mocked<typeof logger>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>
const mockValidate = validate as jest.MockedFunction<typeof validate>

describe('functional:lifecycles/notes', () => {
  const options: GreaseOptions = { dryRun: true }

  const dto: CreateNotesDTO = {
    infile: '__tests__/__fixtures__/CHANGELOG.fixture.md',
    type: NotesType.CHANGELOG,
    version: TAGS[1].replace('v', '')
  }

  describe('executes lifecycle', () => {
    beforeEach(async () => {
      await TestSubject(options, dto)
    })

    it('should run lifecycle scripts', () => {
      expect(mockRunLifecycleScript).toBeCalledTimes(2)
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'prenotes')
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'postnotes')
    })

    it('should log checkpoints', () => {
      expect(mockLogger.checkpoint).toBeCalledTimes(3)
    })

    it('should validate dto', () => {
      expect(mockValidate).toBeCalledTimes(1)
    })
  })

  describe('skips lifecycle', () => {
    it('should skip lifecycle if options.skip.notes === true', async () => {
      // Act
      await TestSubject({ ...options, skip: { notes: true } }, dto)

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLogger.checkpoint).not.toBeCalled()
      expect(mockSH.exec).not.toBeCalled()
    })
  })
})
