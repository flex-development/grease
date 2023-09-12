/**
 * @file Unit Tests - IsDirectoryConstraint
 * @module grease/decorators/tests/unit/IsDirectoryConstraint
 */

import { toURL } from '@flex-development/mlly'
import { sep } from '@flex-development/pathe'
import { cast } from '@flex-development/tutils'
import TestSubject from '../is-directory.constraint'

describe('unit:decorators/IsDirectoryConstraint', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#defaultMessage', () => {
    it('should return default validation failure message', () => {
      expect(subject.defaultMessage(cast({ value: toURL(sep) })))
        .to.equal('$property must be an absolute directory path')
    })
  })

  describe('#validate', () => {
    it('should return false if value is not absolute directory path', () => {
      expect(subject.validate(import.meta.url)).to.be.false
    })

    it('should return true if value is absolute directory path', () => {
      expect(subject.validate(process.cwd())).to.be.true
    })
  })
})
