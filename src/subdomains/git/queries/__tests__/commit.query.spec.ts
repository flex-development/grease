/**
 * @file Unit Tests - CommitQuery
 * @module grease/git/queries/tests/unit/CommitQuery
 */

import { Commit } from '#src/git/models'
import TestSubject from '../commit.query'

describe('unit:git/queries/CommitQuery', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #Commit', () => {
      expect(subject).to.have.property('Commit', Commit)
    })

    it('should set #actions', () => {
      expect(subject).to.have.deep.property('actions', [])
    })

    it('should set #from', () => {
      expect(subject).to.have.property('from', '')
    })

    it('should set #issues', () => {
      expect(subject).to.have.deep.property('issues', [])
    })

    it('should set #pr', () => {
      expect(subject).to.have.deep.property('pr', [])
    })

    it('should set #to', () => {
      expect(subject).to.have.property('to', 'HEAD')
    })
  })
})
