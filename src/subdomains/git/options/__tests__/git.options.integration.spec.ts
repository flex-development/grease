/**
 * @file Integration Tests - GitOptions
 * @module grease/git/options/tests/integration/GitOptions
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../git.options'

describe('integration:git/options/GitOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        colors: 3,
        debug: 1,
        silent: 0,
        tagprefix: null
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
      expect(await validate(new TestSubject())).to.be.an('array').that.is.empty
    })
  })
})
