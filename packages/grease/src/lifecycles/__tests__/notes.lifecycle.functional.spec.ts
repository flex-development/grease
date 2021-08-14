import type { IGreaseOptions } from '@grease/interfaces'
import log from '@grease/utils/log.util'
import TAGS from '@tests/fixtures/git-tags.fixture'
import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../notes.lifecycle'

/**
 * @file Functional Tests - notes
 * @module grease/lifecycles/tests/functional/notes
 */

jest.mock('@grease/utils/log.util')

const mockSH = sh as jest.Mocked<typeof sh>
const mockLog = log as jest.MockedFunction<typeof log>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>

describe('functional:lifecycles/notes', () => {
  const restoreConsole: RestoreConsole = mockConsole()

  const options: IGreaseOptions = {
    dryRun: true,
    infile: '__tests__/__fixtures__/CHANGELOG.fixture.md'
  }

  const version = TAGS[1].replace('v', '')

  afterAll(() => {
    restoreConsole()
  })

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
      expect(mockLog).toBeCalledTimes(2)
    })
  })

  describe('skips lifecycle', () => {
    it('should skip lifecycle if options.skip.notes is true', async () => {
      // Act
      await TestSubject({ ...options, skip: { notes: true } }, version)

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLog).toBeCalledTimes(1)
      expect(mockSH.exec).not.toBeCalled()
    })
  })
})
