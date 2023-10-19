/**
 * @file Unit Tests - BumpQuery
 * @module grease/bump/queries/tests/unit/BumpQuery
 */

import TestSubject from '../bump.query'

describe('unit:bump/queries/BumpQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #to', () => {
      expect(subject).to.have.property('to', 'HEAD')
    })

    it('should set #unstable', () => {
      expect(subject).to.have.property('unstable', false)
    })
  })
})
