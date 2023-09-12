/**
 * @file Unit Tests - CommitOptions
 * @module grease/options/tests/unit/CommitOptions
 */

import pkg from '#pkg' assert { type: 'json' }
import TestSubject from '../commit.options'

describe('unit:options/CommitOptions', () => {
  describe('constructor', () => {
    let from: TestSubject['from']
    let issue_prefixes: TestSubject['issue_prefixes']
    let subject: TestSubject
    let to: TestSubject['to']

    beforeAll(() => {
      subject = new TestSubject({
        from: (from = pkg.tagPrefix + '1.0.0'),
        issue_prefixes: (issue_prefixes = ['#']),
        to: (to = pkg.tagPrefix + '2.0.0')
      })
    })

    it('should set #from', () => {
      expect(subject).to.have.property('from', from)
    })

    it('should set #issue_prefixes', () => {
      expect(subject).to.have.deep.property('issue_prefixes', issue_prefixes)
    })

    it('should set #to', () => {
      expect(subject).to.have.property('to', to)
    })
  })
})
