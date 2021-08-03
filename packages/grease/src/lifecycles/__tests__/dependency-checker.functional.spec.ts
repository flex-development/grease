import logger from '@grease/config/logger'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import { ExitCode } from '@grease/enums/exit-code.enum'
import type { ILogger } from '@grease/interfaces'
import sh from 'shelljs'
import TestSubject from '../dependency-checker'

/**
 * @file Functional Tests - Dependency Checker
 * @module grease/lifecycles/tests/functional/DependencyChecker
 */

jest.mock('@grease/config/logger')

const mockLogger = logger as jest.Mocked<ILogger>
const mockSh = sh as jest.Mocked<typeof sh>

describe('functional:lifecycles/dependency-checker', () => {
  Object.keys(DependencyCommand).forEach((dep, i) => {
    describe(dep, () => {
      describe('error', () => {
        beforeEach(() => {
          // @ts-expect-error sh.which type def is wrong
          mockSh.which.mockImplementation((command: string) => null)
          TestSubject()
        })

        it('should log dependency check error message', () => {
          expect(mockSh.which).toBeCalledWith(dep)
          expect(mockLogger.error.mock.calls[i][0]).toBe(`${dep} not found`)
          expect(mockSh.exit).toBeCalledWith(ExitCode.NOT_FOUND)
        })

        it(`should force shell to exit with code ${ExitCode.NOT_FOUND}`, () => {
          expect(mockSh.exit).toBeCalledWith(ExitCode.NOT_FOUND)
        })
      })

      describe('success', () => {
        beforeEach(() => {
          // @ts-expect-error use string as ShellString
          mockSh.which.mockImplementation((command: string) => command)
          TestSubject()
        })

        it('should log dependency check success message', () => {
          expect(mockSh.which).toBeCalledWith(dep)
          expect(mockLogger.success.mock.calls[i][0]).toBe(`✓ ${dep}`)
          expect(mockSh.exit).toBeCalledWith(ExitCode.SUCCESS)
        })

        it(`should force shell to exit with code ${ExitCode.SUCCESS}`, () => {
          expect(mockSh.exit).toBeCalledWith(ExitCode.SUCCESS)
        })
      })
    })
  })
})
