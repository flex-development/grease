import type { ILogger } from '@grease/interfaces'
import type { Testcase, TestcaseCalled } from '@tests/utils/types'
import ch from 'chalk'
import type { RestoreConsole } from 'jest-mock-console'
import mockConsole from 'jest-mock-console'
import checkpoint from 'standard-version/lib/checkpoint'
import { Container } from 'typedi'
import TestSubject from '../logger.service'

/**
 * @file Functional Tests - Logger
 * @module grease/services/tests/functional/Logger
 */

const mockCH = ch as jest.Mocked<typeof ch>
const mockCheckpoint = checkpoint as jest.MockedFunction<typeof checkpoint>

describe('functional:services/Logger', () => {
  const restoreConsole: RestoreConsole = mockConsole()
  const Subject = Container.get<ILogger>(TestSubject)

  const spy_debug = jest.spyOn(Subject, 'debug')

  afterAll(() => {
    restoreConsole()
  })

  describe('#checkpoint', () => {
    beforeEach(() => {
      Subject.checkpoint('checkpoint', ['arg'])
    })

    it('should call standard-version/lib/checkpoint', () => {
      expect(mockCheckpoint).toBeCalledTimes(1)
    })
  })

  describe('#debug', () => {
    describe('cache.options.dryRun', () => {
      type Case = TestcaseCalled & { dryRun: boolean | undefined }

      const cases: Case[] = [
        { call: 'not call', dryRun: undefined, expected: 0 },
        { call: 'not call', dryRun: false, expected: 0 },
        { call: 'call', dryRun: true, expected: 1 }
      ]

      const name = 'should $call #ch.yellow if cache.options.dryRun === $dryRun'

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { dryRun, expected } = testcase
        Subject.cache.options.dryRun = dryRun

        // Act
        Subject.debug('test cache.options.dryRun')

        // Expect
        expect(mockCH.yellow).toBeCalledTimes(expected)
      })
    })

    describe('cache.options.silent', () => {
      type Case = TestcaseCalled & { silent: boolean | undefined }

      const cases: Case[] = [
        { call: 'call', expected: 1, silent: undefined },
        { call: 'call', expected: 1, silent: false },
        { call: 'not call', expected: 0, silent: true }
      ]

      const nameif = `cache.options.silent === $silent`
      const name = `should $call console.log if ${nameif}`

      it.each<Case>(cases)(name, testcase => {
        // Arrange
        const { expected, silent } = testcase
        const spy_console_log = jest.spyOn(console, 'log')
        Subject.cache.options.silent = silent

        // Act
        Subject.debug('test cache.options.silent')

        // Expect
        expect(spy_console_log).toBeCalledTimes(expected)
      })
    })
  })

  describe('log levels', () => {
    type Case = Testcase<null> & {
      ch: 'red'
      method: 'error'
    }

    const cases: Case[] = [{ ch: 'red', expected: null, method: 'error' }]

    describe.each<Case>(cases)('$method', ({ ch, method }) => {
      describe(`#${method}`, () => {
        beforeEach(() => {
          Subject[method](`${method} message`)
        })

        it(`should call #ch.${ch}`, () => {
          expect(mockCH[ch]).toBeCalledTimes(1)
        })

        it('should call #debug', () => {
          expect(spy_debug).toBeCalledTimes(1)
        })
      })
    })
  })
})
