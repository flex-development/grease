import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { IsString } from 'class-validator'
import testSubject from '../validate.util'

/**
 * @file Unit Tests - validate
 * @module grease/utils/tests/unit/validate
 */

describe('unit:utils/validate', () => {
  class Model {
    @IsString()
    $property: string
  }

  describe('error handling', () => {
    it('should throw ValidationException', async () => {
      // Arrange
      let exception = {} as Exception

      // Act
      try {
        await testSubject(Model, {})
      } catch (error) {
        exception = error as Exception
      }

      // Expect
      expect(exception.constructor.name).toBe('ValidationException')
    })
  })
})
