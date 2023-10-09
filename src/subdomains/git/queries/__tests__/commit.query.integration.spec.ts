/**
 * @file Integration Tests - CommitQuery
 * @module grease/git/queries/tests/integration/CommitQuery
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../commit.query'

describe('integration:git/queries/CommitQuery', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        Commit: () => vi.fn().mockName('Commit'),
        actions: new Set<string>(),
        from: null,
        issues: new Set<string>(),
        pr: new Set<string>(),
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
