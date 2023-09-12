/**
 * @file Integration Tests - GitTagOptions
 * @module grease/options/tests/integration/GitTagOptions
 */

import { toURL } from '@flex-development/mlly'
import { sep } from '@flex-development/pathe'
import { DOT, cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../git-tag.options'

describe('integration:options/GitTagOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        cwd: toURL(sep),
        debug: null,
        tagprefix: /tutils@/,
        unstable: 1
      }))

      // Act
      const errors = await validate(subject, {
        skipMissingProperties: false,
        stopAtFirstError: false,
        validationError: { target: false, value: true }
      })

      // Expect
      expect(errors).toMatchSnapshot()
    })

    it('should pass validation if schema is valid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject({
        cwd: DOT,
        debug: true,
        tagprefix: 'grease@',
        unstable: true
      })

      // Act + Expect
      expect(await validate(subject)).to.be.an('array').that.is.empty
    })
  })
})
