/**
 * @file Unit Tests - GitTagOptions
 * @module grease/git/options/tests/unit/GitTagOptions
 */

import TestSubject from '../git-tag.options'

describe('unit:git/options/GitTagOptions', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #unstable', () => {
      expect(subject).to.have.property('unstable', true)
    })
  })
})
