/**
 * @file Unit Tests - GitTagOptions
 * @module grease/options/tests/unit/GitTagOptions
 */

import pkg from '#pkg' assert { type: 'json' }
import TestSubject from '../git-tag.options'

describe('unit:options/GitTagOptions', () => {
  describe('constructor', () => {
    let subject: TestSubject
    let tagprefix: TestSubject['tagprefix']
    let unstable: TestSubject['unstable']

    beforeAll(() => {
      subject = new TestSubject({
        tagprefix: (tagprefix = pkg.tagPrefix),
        unstable: (unstable = false)
      })
    })

    it('should set #tagprefix', () => {
      expect(subject).to.have.property('tagprefix', tagprefix)
    })

    it('should set #unstable', () => {
      expect(subject).to.have.property('unstable', unstable)
    })
  })
})
