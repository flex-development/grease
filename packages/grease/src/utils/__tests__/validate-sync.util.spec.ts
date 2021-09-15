import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { IsString } from 'class-validator'
import testSubject from '../validate-sync.util'

/**
 * @file Unit Tests - validateSync
 * @module grease/utils/tests/unit/validateSync
 */

describe('unit:utils/validateSync', () => {
  class Model {
    @IsString()
    $property: string
  }

  describe('error handling', () => {
    it('should throw ValidationException', () => {
      // Arrange
      let exception = {} as Exception

      // Act
      try {
        testSubject(Model, {})
      } catch (error) {
        exception = error as Exception
      }

      // Expect
      expect(exception.constructor.name).toBe('ValidationException')
    })
  })
})
