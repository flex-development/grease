/**
 * @file Integration Tests - ChangelogQuery
 * @module grease/changelog/queries/tests/integration/ChangelogQuery
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../changelog.query'

describe('integration:changelog/queries/ChangelogQuery', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        Aggregator: () => vi.fn().mockName('Aggregator'),
        releases: -2,
        types: [],
        unstable: 0
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
