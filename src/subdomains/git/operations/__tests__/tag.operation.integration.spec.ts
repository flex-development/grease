/**
 * @file Integration Tests - TagOperation
 * @module grease/git/operations/tests/integration/TagOperation
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../tag.operation'

describe('integration:git/operations/TagOperation', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        force: 1,
        message: null,
        object: null,
        push: 0,
        remote: '',
        sign: 1,
        tag: '?',
        verify: 1
      }))

      // Act
      const errors = await validate(subject, {
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        stopAtFirstError: false,
        validationError: { target: false, value: true }
      })

      // Expect
      expect(errors).toMatchSnapshot()
    })

    it('should pass validation if schema is valid', async () => {
      // Act
      const results = await validate(new TestSubject({ tag: '3.0.0-dev.1' }))

      // Expect
      expect(results).to.be.an('array').that.is.empty
    })
  })
})
