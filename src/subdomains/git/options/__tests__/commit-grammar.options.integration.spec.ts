/**
 * @file Integration Tests - CommitGrammarOptions
 * @module grease/git/options/tests/integration/CommitGrammarOptions
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../commit-grammar.options'

describe('integration:git/options/CommitGrammarOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({ provider: 'gh' }))

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
