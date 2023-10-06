/**
 * @file Functional Tests - IsFile
 * @module grease/decorators/tests/functional/IsFile
 */

import { toURL } from '@flex-development/mlly'
import { validate } from 'class-validator'
import { URL } from 'node:url'
import IsFileConstraint from '../is-file.constraint'
import TestSubject from '../is-file.decorator'

describe('functional:decorators/IsFile', () => {
  let value: URL

  beforeAll(() => {
    value = toURL('grease.config.json')
  })

  describe('validation failure', () => {
    it('should fail if property is not a file path or url', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly file: unknown = value
      }

      // Act + Expect
      expect((await validate(new Model()))[0]?.constraints).to.eql({
        [IsFileConstraint.options.name]: 'file must be a file path or url'
      })
    })
  })

  describe('validation success', () => {
    it('should pass if property is a file path or url', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly file: string = value.href
      }

      // Act + Expect
      expect(await validate(new Model())).to.be.an('array').that.is.empty
    })
  })
})
