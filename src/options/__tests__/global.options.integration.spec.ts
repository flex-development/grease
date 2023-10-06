/**
 * @file Integration Tests - GlobalOptions
 * @module grease/options/tests/integration/GlobalOptions
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../global.options'

describe('integration:options/GlobalOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        colors: 3,
        config: 0,
        debug: 1,
        quiet: 0,
        tagprefix: null
      }))

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
