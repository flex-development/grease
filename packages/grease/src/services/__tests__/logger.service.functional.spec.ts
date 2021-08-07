import type { TestcaseCalled } from '@tests/utils/types'
import ch from 'chalk'
import GreaseCache from '../grease-cache.service'
import TestSubject from '../logger.service'

/**
 * @file Functional Tests - Logger
 * @module grease/services/tests/functional/Logger
 */

const mockCH = ch as jest.Mocked<typeof ch>

describe('functional:services/Logger', () => {
  const Subject = new TestSubject(new GreaseCache())

  const spy_debug = jest.spyOn(Subject, 'debug')

  describe('#checkpoint', () => {
    beforeEach(() => {
      Subject.checkpoint('checkpoint', ['arg'])
    })

    it('should call #ch.bold', () => {
      expect(mockCH.bold).toBeCalledTimes(3)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
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

  describe('#error', () => {
    beforeEach(() => {
      Subject.error('error message')
    })

    it('should call #ch.red', () => {
      expect(mockCH.red).toBeCalledTimes(1)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
    })
  })

  describe('#info', () => {
    beforeEach(() => {
      Subject.info('info message')
    })

    it('should call #ch.blue', () => {
      expect(mockCH.blue).toBeCalledTimes(1)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
    })
  })

  describe('#log', () => {
    beforeEach(() => {
      Subject.log('log message')
    })

    it('should call #ch.white', () => {
      expect(mockCH.white).toBeCalledTimes(1)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
    })
  })

  describe('#success', () => {
    beforeEach(() => {
      Subject.success('success message')
    })

    it('should call #ch.green', () => {
      expect(mockCH.green).toBeCalledTimes(1)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
    })
  })

  describe('#warn', () => {
    beforeEach(() => {
      Subject.warn('warning message')
    })

    it('should call #ch.yellow', () => {
      expect(mockCH.yellow).toBeCalledTimes(1)
    })

    it('should call #debug', () => {
      expect(spy_debug).toBeCalledTimes(1)
    })
  })
})
