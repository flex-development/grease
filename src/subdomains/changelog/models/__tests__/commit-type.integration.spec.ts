/**
 * @file Integration Tests - CommitType
 * @module grease/changelog/models/tests/integration/CommitType
 */

import { Type } from '@flex-development/commitlint-config'
import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../commit-type.model'

describe('integration:changelog/models/CommitType', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        hidden: null,
        section: null,
        type: null
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
        section: ':mechanical_arm: Refactors',
        type: Type.REFACTOR
      })

      // Act + Expect
      expect(await validate(subject)).to.be.an('array').that.is.empty
    })
  })
})
