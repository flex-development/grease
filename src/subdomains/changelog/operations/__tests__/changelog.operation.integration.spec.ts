/**
 * @file Integration Tests - ChangelogOperation
 * @module grease/changelog/operations/tests/integration/ChangelogOperation
 */

import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../changelog.operation'

describe('integration:changelog/operations/ChangelogOperation', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        Formatter: () => vi.fn().mockName('Formatter'),
        infile: null,
        outfile: null,
        samefile: 1,
        write: 0
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
