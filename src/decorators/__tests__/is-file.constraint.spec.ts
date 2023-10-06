/**
 * @file Unit Tests - IsFileConstraint
 * @module grease/decorators/tests/unit/IsFileConstraint
 */

import { toURL } from '@flex-development/mlly'
import { cast } from '@flex-development/tutils'
import { URL } from 'node:url'
import TestSubject from '../is-file.constraint'

describe('unit:decorators/IsFileConstraint', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#defaultMessage', () => {
    it('should return default validation failure message', () => {
      // Arrange
      const value: URL = toURL(import.meta.url)

      // Act
      const result = subject.defaultMessage(cast({ value }))

      // Expect
      expect(result).to.equal('$property must be a file path or url')
    })
  })

  describe('#validate', () => {
    it('should return false if value is not a file path or url', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [process.cwd()],
        [toURL(process.cwd()).href]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.false)
    })

    it('should return true if value is a file path or url', () => {
      // Arrange
      const cases: Parameters<TestSubject['validate']>[] = [
        [import.meta.url],
        [toURL(import.meta.url).pathname]
      ]

      // Act + Expect
      cases.forEach(([value]) => expect(subject.validate(value)).to.be.true)
    })
  })
})
