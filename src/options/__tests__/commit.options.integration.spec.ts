/**
 * @file Integration Tests - CommitOptions
 * @module grease/options/tests/integration/CommitOptions
 */

import { toURL } from '@flex-development/mlly'
import { sep } from '@flex-development/pathe'
import { DOT, cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../commit.options'

describe('integration:options/CommitOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        cwd: toURL(sep),
        debug: null,
        from: null,
        issue_prefixes: '#',
        to: /^HEAD/
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
        from: 'grease@1.0.0',
        issue_prefixes: ['#'],
        to: 'grease@2.0.0'
      })

      // Act + Expect
      expect(await validate(subject)).to.be.an('array').that.is.empty
    })
  })
})
