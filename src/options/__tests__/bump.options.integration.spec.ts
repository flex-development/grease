/**
 * @file Integration Tests - BumpOptions
 * @module grease/options/tests/integration/BumpOptions
 */

import { ReleaseType } from '#src/enums'
import { toURL } from '@flex-development/mlly'
import { cast } from '@flex-development/tutils'
import { validate } from 'class-validator'
import TestSubject from '../bump.options'

describe('integration:options/BumpOptions', () => {
  describe('validation', () => {
    it('should fail validation if schema is invalid', async () => {
      // Arrange
      const subject: TestSubject = new TestSubject(cast({
        manifest: null,
        preid: null,
        prestart: 3,
        release: '3.1',
        silent: 0,
        write: 1
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
        manifest: toURL('package.json').href,
        release: ReleaseType.MAJOR,
        write: true
      })

      // Act + Expect
      expect(await validate(subject)).to.be.an('array').that.is.empty
    })
  })
})
