import log from '@flex-development/log'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import type { Level } from '@flex-development/log/types'
import type { IGreaseOptions } from '@grease/interfaces'
import type { TestcaseCalled } from '@tests/utils/types'
import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import testSubject from '../logger.util'

/**
 * @file Functional Tests - logger
 * @module grease/utils/tests/functional/logger
 */

const mockLog = log as jest.MockedFunction<typeof log>

describe('functional:utils/logger', () => {
  const restoreConsole: RestoreConsole = mockConsole()

  const args: any[] = ['some', 'data', '!']
  const bold: boolean = true

  afterAll(() => {
    restoreConsole()
  })

  it('should call @flex-development/log', () => {
    // Arrange
    const options: IGreaseOptions = { dryRun: false, silent: false }

    const level: Level = LogLevel.DEBUG
    const message: string = `${level} message`

    // Act
    testSubject(options, message, args, level, bold)

    // Expect
    expect(mockLog).toBeCalledTimes(1)
    expect(mockLog).toBeCalledWith(message, {
      args,
      bold: { args: true, data: bold },
      level,
      silent: options.silent
    })
  })

  describe('options', () => {
    describe('options.dryRun', () => {
      type Case = Omit<TestcaseCalled, 'call' | 'expected'> & {
        dryRun: boolean
        level: Level
      }

      const cases: Case[] = [
        { dryRun: true, level: LogLevel.WARN },
        { dryRun: false, level: LogLevel.INFO }
      ]

      const name = 'should override log level if options.dryRun === $dryRun'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { dryRun, level } = testcase

        // Act
        testSubject({ dryRun }, 'message', args, level, bold)

        // Expect
        expect(mockLog.mock.calls[0][1]).toMatchObject({ level })
      })
    })
  })
})
