/**
 * @file Functional Tests - IsDirectory
 * @module grease/decorators/tests/functional/IsDirectory
 */

import pathe from '@flex-development/pathe'
import { validate } from 'class-validator'
import IsDirectoryConstraint from '../is-directory.constraint'
import TestSubject from '../is-directory.decorator'

describe('functional:decorators/IsDirectory', () => {
  let value: string

  beforeAll(() => {
    value = '../../../'
  })

  describe('validation failure', () => {
    it('should fail if property is not absolute directory path', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly directory: string = value
      }

      // Act + Expect
      expect((await validate(new Model()))[0]?.constraints).to.eql({
        [IsDirectoryConstraint.options.name]:
          'directory must be an absolute directory path'
      })
    })
  })

  describe('validation success', () => {
    it('should pass if property is absolute directory path', async () => {
      // Arrange
      class Model {
        @TestSubject()
        public readonly directory: string = pathe.resolve(value)
      }

      // Act + Expect
      expect(await validate(new Model())).to.be.an('array').that.is.empty
    })
  })
})
