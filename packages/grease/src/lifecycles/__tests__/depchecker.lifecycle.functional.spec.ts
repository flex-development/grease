import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import logger from '@grease/config/logger.config'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import type { ILogger } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import ch from 'chalk'
import figures from 'figures'
import indexOf from 'lodash/indexOf'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import TestSubject from '../depchecker.lifecycle'

/**
 * @file Functional Tests - depchecker
 * @module grease/lifecycles/tests/functional/depchecker
 */

jest.mock('@grease/config/logger.config')

const mockCH = ch as jest.Mocked<typeof ch>
const mockSH = sh as jest.Mocked<typeof sh>
const mockLogger = logger as jest.Mocked<ILogger>
const mockRunLifecycleScript = runLifecycleScript as jest.MockedFunction<
  typeof runLifecycleScript
>

describe('functional:lifecycles/depchecker', () => {
  const mockShellString = mockSH.ShellString('command')
  const options: GreaseOptions = { dryRun: true }

  describe('executes lifecycle', () => {
    it('should call sh.which', () => {
      // Arrange
      mockSH.which.mockReturnValue(mockShellString)
      const commands = Object.keys(DependencyCommand)
      const expected = commands.length

      // Act
      TestSubject(options)

      // Expect
      expect(mockSH.which).toBeCalledTimes(expected)
      commands.forEach(command => expect(mockSH.which).toBeCalledWith(command))
    })

    it('should run lifecycle scripts', () => {
      // Arrange
      mockSH.which.mockReturnValue(mockShellString)

      // Act
      TestSubject(options)

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
        it('should throw if not found', () => {
          // Arrange
          // @ts-expect-error 'null' is not assignable to type 'ShellString'
          mockSH.which.mockReturnValue(null)
          let exception = {} as Exception

          // Act
          try {
            TestSubject(options)
          } catch (error) {
            exception = error
          }

          // Expect
          expect(exception).toMatchObject({
            code: ExceptionStatusCode.NOT_FOUND,
            data: {
              checkpoint: { args: [], figure: mockCH.red(figures.cross) }
            },
            message: `${command} not found`
          })
        })

        describe('logs checkpoint', () => {
          it('should log if found', () => {
            // Arrange
            mockSH.which.mockReturnValue(mockSH.ShellString(command))

            // Act
            TestSubject(options)

            // Expect
            expect(mockLogger.checkpoint.mock.calls[i + 1][0]).toBe(command)
          })
        })
      })
    })
  })

  describe('skips lifecycle', () => {
    it('should skip lifecycle if options.skip.depchecker === true', () => {
      // Act
      TestSubject({ ...options, skip: { depchecker: true } })

      // Expect
      expect(mockRunLifecycleScript).not.toBeCalled()
      expect(mockLogger.checkpoint).not.toBeCalled()
      expect(mockSH.which).not.toBeCalled()
    })
  })
})
