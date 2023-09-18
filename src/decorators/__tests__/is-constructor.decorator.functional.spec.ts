/**
 * @file Functional Tests - IsConstructor
 * @module grease/decorators/tests/functional/IsConstructor
 */

import { template, type Constructor } from '@flex-development/tutils'
import { validate } from 'class-validator'
import IsConstructorConstraint from '../is-constructor.constraint'
import TestSubject from '../is-constructor.decorator'

describe('functional:decorators/IsConstructor', () => {
  describe('validation failure', () => {
    it('should fail if property is not a constructor', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly Class: unknown = template
      }

      // Act + Expect
      expect((await validate(new Model()))[0]?.constraints).to.eql({
        [IsConstructorConstraint.options.name]: 'Class must be a constructor'
      })
    })
  })

  describe('validation success', () => {
    it('should pass if property is a constructor', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly Class: Constructor<any> = IsConstructorConstraint
      }

      // Act + Expect
      expect(await validate(new Model())).to.be.an('array').that.is.empty
    })
  })
})
