/**
 * @file Integration Tests - GreaseConfig
 * @module grease/config/models/tests/integration/GreaseConfig
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../grease-config.model'

describe('integration:config/models/GreaseConfig', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        changelog: { releases: -2 },
        color: 3,
        config: 0,
        level: 'quiet',
        tagprefix: null,
        unstable: 1
      }))

      // Act
      const errors = await validate(subject, {
        skipMissingProperties: false,
        skipNullProperties: false,
        skipUndefinedProperties: false,
        stopAtFirstError: false,
        validationError: { target: false, value: false }
      })

      // Expect
      expect(errors).toMatchSnapshot()
    })

    it('should pass validation if schema is valid', async () => {
      expect(await validate(new TestSubject())).to.be.an('array').that.is.empty
    })
  })
})
