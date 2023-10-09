/**
 * @file Unit Tests - TagQuery
 * @module grease/git/queries/tests/unit/TagQuery
 */

import TestSubject from '../tag.query'

describe('unit:git/queries/TagQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #sort', () => {
      expect(subject).to.have.deep.property('sort', ['-creatordate'])
    })
  })
})
