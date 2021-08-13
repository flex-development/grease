import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import logger from '@grease/config/logger.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import type { ICreateReleaseDTO } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import validate from '@grease/utils/validate.util'
import { VERSION } from '@tests/fixtures/git-tags.fixture'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../greaser.lifecycle'

/**
 * @file Functional Tests - greaser
 * @module grease/lifecycles/tests/functional/greaser
 */

jest.mock('@grease/config/logger.config')
jest.mock('@grease/utils/validate.util')

const mockSH = sh as jest.Mocked<typeof sh>
const mockLogger = logger as jest.Mocked<typeof logger>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>
const mockValidate = validate as jest.MockedFunction<typeof validate>

describe('functional:lifecycles/greaser', () => {
  const options: GreaseOptions = {}
  const dto: ICreateReleaseDTO = { version: VERSION }

  describe('executes lifecycle', () => {
    beforeEach(async () => {
      await TestSubject({}, dto)
    })

    it('should run lifecycle scripts', () => {
      expect(mockRunLifecycleScript).toBeCalledTimes(2)
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'pregreaser')
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'postgreaser')
    })

    it('should log checkpoints', () => {
      expect(mockLogger.checkpoint).toBeCalledTimes(1)
    })

    it('should validate release data', () => {
      expect(mockValidate).toBeCalledTimes(1)
      expect(mockValidate).toBeCalledWith(CreateReleaseDTO, dto, false)
    })

    it('should execute github release command', () => {
      expect(mockSH.exec).toBeCalledTimes(1)
      expect(mockSH.exec.mock.calls[0][0]).toMatch(GH_RELEASE_CREATE)
    })
  })

  describe('skips lifecycle', () => {
    type Case = { lifecycle: 'depchecker' | 'greaser' }

    const cases: Case[] = [
      { lifecycle: 'depchecker' },
      { lifecycle: 'greaser' }
    ]

    const name = 'should skip lifecycle if options.skip.$lifecycle === true'

    it.each<Case>(cases)(name, testcase => {
      // Arrange
      const { lifecycle } = testcase

      // Act
      TestSubject({ skip: { [lifecycle]: true } }, dto)

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLogger.checkpoint).not.toBeCalled()
      expect(mockSH.which).not.toBeCalled()
    })
  })
})
