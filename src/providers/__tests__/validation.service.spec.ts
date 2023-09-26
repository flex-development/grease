/**
 * @file Unit Tests - ValidationService
 * @module grease/providers/tests/unit/ValidationService
 */

import { GlobalOptions } from '#src/options'
import AggregateError from '@flex-development/aggregate-error-ponyfill'
import { cast } from '@flex-development/tutils'
import type { ValidationError } from 'class-validator'
import TestSubject from '../validation.service'

describe('unit:providers/ValidationService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#validate', () => {
    it('should return validated instance if schema is valid', async () => {
      // Arrange
      const obj: GlobalOptions = new GlobalOptions()

      // Act + Expect
      expect(await subject.validate(obj)).to.equal(obj)
    })

    it('should throw if validation fails', async () => {
      // Arrange
      const obj: GlobalOptions = new GlobalOptions(cast({ cwd: 'x', debug: 0 }))
      const message: string = `GlobalOptions validation failure: [cwd,debug]`
      let error!: AggregateError<ValidationError, GlobalOptions>

      // Act
      try {
        await subject.validate(obj)
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(AggregateError)
      expect(error).to.have.deep.property('cause', obj)
      expect(error).to.have.property('errors').be.an('array').of.length(2)
      expect(error).to.have.property('message', message)
    })
  })
})
