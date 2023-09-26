/**
 * @file Integration Tests - Repository
 * @module grease/git/models/tests/integration/Repository
 */

import { validate } from 'class-validator'
import TestSubject from '../repository.model'

describe('integration:git/models/Repository', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject('null')

      // Act
      const errors = await validate(subject, {
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        stopAtFirstError: false,
        validationError: { target: false, value: true },
        whitelist: true
      })

      // Expect
      expect(errors).toMatchSnapshot()
    })

    it('should pass validation if schema is valid', async () => {
      expect(await validate(new TestSubject())).to.be.an('array').that.is.empty
    })
  })
})
