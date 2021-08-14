import { LogLevel } from '@grease/enums/log-level.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import { Testcase } from '@tests/utils/types'
import ch from 'chalk'
import figures from 'figures'
import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import checkpoint from 'standard-version/lib/checkpoint'
import testSubject from '../log.util'

/**
 * @file Functional Tests - log
 * @module grease/utils/tests/functional/log
 */

const mockCH = ch as jest.Mocked<typeof ch>
const mockCheckpoint = checkpoint as jest.MockedFunction<typeof checkpoint>

describe('functional:utils/log', () => {
  const restoreConsole: RestoreConsole = mockConsole()

  const options: IGreaseOptions = {}

  afterAll(() => {
    restoreConsole()
  })

  it('should call standard-version/lib/checkpoint', () => {
    // Act
    testSubject(options, 'log message')

    // Expect
    expect(mockCheckpoint).toBeCalledTimes(1)
    expect(mockCheckpoint).toBeCalledWith(
      options,
      mockCH.white(),
      [],
      mockCH.bold.green()
    )
  })

  describe('args', () => {
    describe('bold', () => {
      it('should log bold message if args.bold === true', () => {
        // Act
        testSubject(options, 'message', [], 'info', true)

        // Expect
        expect(mockCH.bold).toBeCalledTimes(1)
      })
    })

    describe('level', () => {
      type Case = Testcase<number> & {
        figure: string
        level: keyof typeof LogLevel
      }

      const cases: Case[] = [
        {
          expected: 1,
          figure: figures.cross,
          level: 'error'
        },
        {
          expected: 1,
          figure: figures.info,
          level: 'info'
        },
        {
          expected: 1,
          figure: figures.tick,
          level: 'success'
        },
        {
          expected: 1,
          figure: '!',
          level: 'warning'
        }
      ]

      it.each<Case>(cases)('should log $level message', testcase => {
        // Arrange
        const { expected, figure, level } = testcase

        // Act
        testSubject(options, `${level} message`, [], level)

        // Expect
        expect(mockCH.bold[LogLevel[level]]).toBeCalledTimes(expected)
        expect(mockCH.bold[LogLevel[level]]).toBeCalledWith(figure)
      })
    })
  })
})
