/**
 * @file Unit Tests - IsConstructorConstraint
 * @module grease/decorators/tests/unit/IsConstructorConstraint
 */

import AggregateError from '@flex-development/aggregate-error-ponyfill'
import { cast } from '@flex-development/tutils'
import TestSubject from '../is-constructor.constraint'

describe('unit:decorators/IsConstructorConstraint', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#defaultMessage', () => {
    it('should return default validation failure message', () => {
      expect(subject.defaultMessage(cast({ value: vi.fn() })))
        .to.equal('$property must be a constructor')
    })
  })

  describe('#validate', () => {
    it('should return false if value is not a constructor', () => {
      expect(subject.validate(new AggregateError([]).toString)).to.be.false
    })

    it('should return true if value is a constructor', () => {
      expect(subject.validate(AggregateError)).to.be.true
    })
  })
})
