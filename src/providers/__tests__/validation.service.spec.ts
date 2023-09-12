/**
 * @file Unit Tests - ValidationService
 * @module grease/providers/tests/unit/ValidationService
 */

import { GitOptions } from '#src/options'
import AggregateError from '@flex-development/aggregate-error-ponyfill'
import { DOT, cast } from '@flex-development/tutils'
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
      const instance: GitOptions = new GitOptions({ cwd: DOT, debug: true })

      // Act + Expect
      expect(await subject.validate(instance)).to.equal(instance)
    })

    it('should throw if validation fails', async () => {
      // Arrange
      const instance: GitOptions = new GitOptions(cast({ cwd: null, debug: 0 }))
      const message: string = `GitOptions validation failure: [cwd,debug]`
      let error!: AggregateError<ValidationError, GitOptions>

      // Act
      try {
        await subject.validate(instance)
      } catch (e: unknown) {
        error = cast(e)
      }

      // Expect
      expect(error).to.be.instanceof(AggregateError)
      expect(error).to.have.deep.property('cause', instance)
      expect(error).to.have.property('errors').be.an('array').of.length(2)
      expect(error).to.have.property('message', message)
    })
  })
})
