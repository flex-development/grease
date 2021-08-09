import logger from '@grease/config/logger.config'
import GreaseOptions from '@grease/models/grease-options.model'
import TAGS from '@tests/fixtures/git-tags.fixture'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../notes.lifecycle'

/**
 * @file Functional Tests - notes
 * @module grease/lifecycles/tests/functional/notes
 */

jest.mock('@grease/config/logger.config')

const mockSH = sh as jest.Mocked<typeof sh>
const mockLogger = logger as jest.Mocked<typeof logger>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>

describe('functional:lifecycles/notes', () => {
  const options: GreaseOptions = {
    dryRun: true,
    infile: '__tests__/__fixtures__/CHANGELOG.fixture.md'
  }

  const version = TAGS[1].replace('v', '')

  describe('executes lifecycle', () => {
    beforeEach(async () => {
      await TestSubject(options, version)
    })

    it('should run lifecycle scripts', () => {
      expect(mockRunLifecycleScript).toBeCalledTimes(2)
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'prenotes')
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'postnotes')
    })

    it('should log checkpoints', () => {
      expect(mockLogger.checkpoint).toBeCalledTimes(2)
    })
  })

  describe('skips lifecycle', () => {
    it('should skip lifecycle if options.skip.notes === true', async () => {
      // Act
      await TestSubject({ ...options, skip: { notes: true } }, version)

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLogger.checkpoint).not.toBeCalled()
      expect(mockSH.exec).not.toBeCalled()
    })
  })
})
