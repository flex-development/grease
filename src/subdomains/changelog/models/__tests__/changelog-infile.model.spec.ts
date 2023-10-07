/**
 * @file Unit Tests - ChangelogInfile
 * @module grease/changelog/models/tests/unit/ChangelogInfile
 */

import pathe from '@flex-development/pathe'
import { pick } from '@flex-development/tutils'
import json5 from 'json5'
import util from 'node:util'
import TestSubject from '../changelog-infile.model'

describe('unit:changelog/models/ChangelogInfile', () => {
  let cwd: string
  let subject: TestSubject

  beforeAll(() => {
    cwd = '__fixtures__/changelog'
    subject = new TestSubject(undefined, cwd)
  })

  describe('constructor', () => {
    it('should set #path', () => {
      expect(subject)
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

  describe('#[util.inspect.custom]', () => {
    it('should return inspection string', () => {
      expect(json5.parse(util.inspect(subject))).to.eql(pick(subject, ['path']))
    })
  })

  describe('#toString', () => {
    it('should return infile content', () => {
      expect(subject.toString()).toMatchSnapshot()
    })
  })
})
