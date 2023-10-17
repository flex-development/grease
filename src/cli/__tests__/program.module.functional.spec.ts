/**
 * @file Functional Tests - ProgramModule
 * @module grease/cli/tests/functional/ProgramModule
 */

import { LoggerService } from '#src/log'
import type { Spy } from '#tests/interfaces'
import { CommanderError } from '@flex-development/nest-commander/commander'
import TestSubject from '../program.module'

describe('functional:cli/ProgramModule', () => {
  let error: Spy<LoggerService['error']>

  beforeEach(() => {
    error = vi.spyOn(LoggerService.prototype, 'error')
    error = error.mockImplementation(vi.fn().mockName('LoggerService#error'))
  })

  describe('.error', () => {
    it('should handle error', () => {
      // Arrange
      const e: Error = new Error('ProgramModule.error test')

      // Act
      TestSubject.error(e)

      // Expect
      expect(error).toHaveBeenCalledOnce()
      expect(error).toHaveBeenCalledWith(e)
      expect(process).to.have.property('exitCode', 1)
    })
  })

  describe('.exit', () => {
    it('should handle error with exit code 0', () => {
      // Arrange
      const code: string = 'commander.helpDisplayed'
      const message: string = '(outputHelp)'
      const e: CommanderError = new CommanderError(0, code, message)

      // Act
      TestSubject.exit(e)

      // Expect
      expect(error).not.toHaveBeenCalled()
      expect(process).to.have.property('exitCode', e.exitCode)
    })

    it('should handle error with exit code greater than 0', () => {
      // Arrange
      const code: string = 'commander.unknownCommand'
      const message: string = 'error: unknown command \'bumper\''
      const e: CommanderError = new CommanderError(127, code, message)

      // Act
      TestSubject.exit(e)

      // Expect
      expect(error).toHaveBeenCalledOnce()
      expect(error).toHaveBeenCalledWith(e)
      expect(process).to.have.property('exitCode', e.exitCode)
    })
  })
})
