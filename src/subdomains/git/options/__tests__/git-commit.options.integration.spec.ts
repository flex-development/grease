/**
 * @file Integration Tests - GitCommitOptions
 * @module grease/git/options/tests/integration/GitCommitOptions
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../git-commit.options'

describe('integration:git/options/GitCommitOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        Commit: () => vi.fn().mockName('Commit'),
        from: null,
        to: /^HEAD/
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
