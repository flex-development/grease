/**
 * @file Functional Tests - ProgramModule
 * @module grease/cli/tests/functional/ProgramModule
 */

import { CommanderError } from '@flex-development/nest-commander/commander'
import consola from 'consola'
import TestSubject from '../program.module'

describe('functional:cli/ProgramModule', () => {
  beforeAll(() => {
    consola.mockTypes(() => vi.fn())
  })

  describe('.error', () => {
    it('should handle error', () => {
      // Arrange
      const e: Error = new Error('ProgramModule.error test')

      // Act
      TestSubject.error(e)

      // Expect
      expect(process).to.have.property('exitCode', 1)
      expect(consola.error).toHaveBeenCalledOnce()
      expect(consola.error).toHaveBeenCalledWith(e.message)
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
      expect(process).to.have.property('exitCode', e.exitCode)
      expect(consola.error).not.toHaveBeenCalled()
    })

    it('should handle error with exit code greater than 0', () => {
      // Arrange
      const code: string = 'commander.unknownCommand'
      const message: string = 'error: unknown command \'bumper\''
      const e: CommanderError = new CommanderError(127, code, message)

      // Act
      TestSubject.exit(e)

      // Expect
      expect(process).to.have.property('exitCode', e.exitCode)
      expect(consola.error).toHaveBeenCalledOnce()
      expect(consola.error).toHaveBeenCalledWith(e.message)
    })
  })
})
