import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import ERROR from '@grease/tests/fixtures/error.fixture'
import VALIDATION_ERRORS from '@grease/tests/fixtures/validation-errors.fixture'
import TestSubject from '../validation.exception'

/**
 * @file Unit Tests - ValidationException
 * @module grease/exceptions/tests/unit/ValidationException
 */

describe('unit:exceptions/ValidationException', () => {
  const MODEL = 'Model'

  describe('constructor', () => {
    const data = { test: true }

    it('should convert Error into Exception', () => {
      // Act
      const exception = new TestSubject(MODEL, ERROR, data)

      // Expect
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.BAD_REQUEST,
        data,
        errors: [],
        message: ERROR.message
      })
    })

    it('should convert ValidationError[] into Exception', () => {
      // Act
      const exception = new TestSubject(MODEL, VALIDATION_ERRORS, data)

      // Expect
      expect(exception.message).toStartWith(MODEL)
      expect(exception.message).toMatch(/(validation failure: )\[([a-z])\w+/)
      expect(exception).toMatchObject({
        code: ExceptionStatusCode.BAD_REQUEST,
        data,
        errors: VALIDATION_ERRORS
      })
    })
  })
})
