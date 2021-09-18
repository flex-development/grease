import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import logger from '@grease/utils/logger.util'
import indexOf from 'lodash.indexof'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../depchecker.lifecycle'

/**
 * @file Functional Tests - depchecker
 * @module grease/lifecycles/tests/functional/depchecker
 */

jest.mock('@grease/utils/logger.util')

const mockSH = sh as jest.Mocked<typeof sh>
const mockLogger = logger as jest.MockedFunction<typeof logger>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>

describe('functional:lifecycles/depchecker', () => {
  const mockShellString = mockSH.ShellString('command')
  const options: IGreaseOptions = { dryRun: true }

  describe('executes lifecycle', () => {
    it('should call sh.which', async () => {
      // Arrange
      mockSH.which.mockReturnValue(mockShellString)
      const commands = Object.keys(DependencyCommand)
      const expected = commands.length

      // Act
      await TestSubject(options)

      // Expect
      expect(mockSH.which).toBeCalledTimes(expected)
      commands.forEach(command => expect(mockSH.which).toBeCalledWith(command))
    })

    it('should run lifecycle scripts', async () => {
      // Arrange
      mockSH.which.mockReturnValue(mockShellString)

      // Act
      await TestSubject(options)

      // Expect
      expect(mockRunLifecycleScript).toBeCalledTimes(2)
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'predepchecker')
      expect(mockRunLifecycleScript).toBeCalledWith(options, 'postdepchecker')
    })

    describe('dependency command check', () => {
      type Case = { command: DependencyCommand; i: number }

      const checks = Object.values(DependencyCommand)

      const cases: Case[] = [
        {
          command: DependencyCommand.gh,
          i: indexOf(checks, DependencyCommand.gh)
        }
      ]

      describe.each<Case>(cases)('$command', ({ command, i }) => {
        it('should throw if not found', async () => {
          // Arrange
          // @ts-expect-error 'null' is not assignable to type 'ShellString'
          mockSH.which.mockReturnValue(null)
          let exception = {} as Exception

          // Act
          try {
            await TestSubject(options)
          } catch (error) {
            exception = error as Exception
          }

          // Expect
          expect(exception).toMatchObject({
            code: ExceptionStatusCode.NOT_FOUND,
            message: `${command} not found`
          })
        })

        describe('logs checkpoint', () => {
          it('should log if found', async () => {
            // Arrange
            mockSH.which.mockReturnValue(mockSH.ShellString(command))

            // Act
            await TestSubject(options)

            // Expect
            expect(mockLogger.mock.calls[i + 1][1]).toBe(command)
          })
        })
      })
    })
  })

  describe('skips lifecycle', () => {
    it('should skip lifecycle if options.skip.depchecker is true', async () => {
      // Act
      await TestSubject({ ...options, skip: { depchecker: true } })

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLogger).not.toBeCalled()
      expect(mockSH.which).not.toBeCalled()
    })
  })
})
