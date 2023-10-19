/**
 * @file Integration Tests - BumpOperation
 * @module grease/bump/operations/tests/integration/BumpOperation
 */

import { ReleaseType } from '#src/enums'
import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../bump.operation'

describe('integration:bump/operations/BumpOperation', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        files: [],
        preid: null,
        prestart: 3,
        release: '3.1',
        write: 1
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
      // Arrange
      const subject: TestSubject = new TestSubject({
        release: ReleaseType.MAJOR
      })

      // Act + Expect
      expect(await validate(subject)).to.be.an('array').that.is.empty
    })
  })
})
