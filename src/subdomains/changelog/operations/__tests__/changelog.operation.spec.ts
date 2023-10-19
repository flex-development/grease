/**
 * @file Unit Tests - ChangelogOperation
 * @module grease/changelog/operations/tests/unit/ChangelogOperation
 */

import { ChangelogFormatter } from '#src/changelog/models'
import pathe from '@flex-development/pathe'
import TestSubject from '../changelog.operation'

describe('unit:changelog/operations/ChangelogOperation', () => {
  let infile: string

  beforeAll(() => {
    infile = pathe.resolve('CHANGELOG.md')
  })

  describe('constructor', () => {
    it('should set #Formatter', () => {
      // Act
      const subject: TestSubject = new TestSubject()

      // Expect
      expect(subject).to.have.property('Formatter', ChangelogFormatter)
    })

    it('should set #infile', () => {
      // Act
      const subject: TestSubject = new TestSubject({
        infile: pathe.basename(infile)
      })

      // Expect
      expect(subject).to.have.property('infile', infile)
    })

    it('should set #infile and #outfile according to #samefile', () => {
      // Act
      const subject: TestSubject = new TestSubject({ samefile: true })

      // Expect
      expect(subject).to.have.property('infile', infile)
      expect(subject).to.have.property('outfile', infile)
    })

    it('should set #outfile', () => {
      // Arrange
      const outfile: string = pathe.resolve('RELEASE_NOTES.md')

      // Act
      const subject: TestSubject = new TestSubject({
        outfile: pathe.basename(outfile)
      })

      // Expect
      expect(subject).to.have.property('outfile', outfile)
    })

    it('should set #quiet', () => {
      expect(new TestSubject()).to.have.property('quiet', false)
    })

    it('should set #samefile', () => {
      expect(new TestSubject()).to.have.property('samefile', false)
    })

    it('should set #samefile and #releases according to #write', () => {
      // Act
      const subject: TestSubject = new TestSubject({
        releases: 0,
        write: true
      })

      // Expect
      expect(subject).to.have.property('samefile').be.true
    })

    it('should set #write', () => {
      expect(new TestSubject()).to.have.property('write', false)
    })

    it('should set #write according to #quiet', () => {
      // Act
      const subject: TestSubject = new TestSubject({ quiet: true, write: true })

      // Expect
      expect(subject).to.have.property('write', false)
    })
  })
})
