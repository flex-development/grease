/**
 * @file Unit Tests - ChangelogInfile
 * @module grease/changelog/models/tests/unit/ChangelogInfile
 */

import pathe from '@flex-development/pathe'
import TestSubject from '../changelog-infile.model'

describe('unit:changelog/models/ChangelogInfile', () => {
  let cwd: string

  beforeAll(() => {
    cwd = '__fixtures__/changelog'
  })

  describe('constructor', () => {
    it('should set #path', () => {
      expect(new TestSubject(undefined, cwd))
        .to.have.property('path', pathe.resolve(cwd, 'CHANGELOG.md'))
    })

    it('should throw if infile is invalid', () => {
      // Arrange
      let error!: Error

      // Act
      try {
        new TestSubject('')
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.nested.property('cause.infile', process.cwd())
      expect(error).to.have.property('message', 'invalid infile')
    })
  })

  describe('#toString', () => {
    it('should return infile content', () => {
      expect(new TestSubject(undefined, cwd).toString()).toMatchSnapshot()
    })
  })
})
