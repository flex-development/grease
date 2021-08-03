import Exception from '@flex-development/exceptions/exceptions/base.exception'
import ERRORS from '@tests/fixtures/validation-errors.fixture'
import { classToPlain } from 'class-transformer'
import { transformAndValidate } from 'class-transformer-validator'
import { IsString } from 'class-validator'
import { mocked } from 'ts-jest/utils'
import testSubject from '../validate.util'

/**
 * @file Unit Tests - validate
 * @module grease/utils/tests/unit/validate
 */

jest.mock('class-transformer')
jest.mock('class-transformer-validator')

const mockClassToPlain = mocked(classToPlain)
const mockTransformAndValidate = mocked(transformAndValidate)

describe('unit:utils/validate', () => {
  class Model {
    @IsString()
    $property: string
  }

  const value: Model = { $property: 'string' }

  describe('error handling', () => {
    it('should throw ValidationException', async () => {
      // Arrange
      mockClassToPlain.mockReturnValue(ERRORS)
      mockTransformAndValidate.mockImplementationOnce(() => {
        throw ERRORS
      })

      let exception = {} as Exception

      // Act
      try {
        await testSubject(Model, value)
      } catch (error) {
        exception = error
      }

      // Expect
      expect(exception.constructor.name).toBe('ValidationException')
    })
  })
})
