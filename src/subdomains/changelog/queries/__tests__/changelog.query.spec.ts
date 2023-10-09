/**
 * @file Unit Tests - ChangelogQuery
 * @module grease/changelog/queries/tests/unit/ChangelogQuery
 */

import { ChangelogAggregator, CommitType } from '#src/changelog/models'
import TestSubject from '../changelog.query'

describe('unit:changelog/queries/ChangelogQuery', () => {
  let releases: number
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject({ releases: releases = 0 })
  })

  describe('constructor', () => {
    it('should set #Aggregator', () => {
      expect(subject).to.have.property('Aggregator', ChangelogAggregator)
    })

    it('should set #from if all entries are queried', () => {
      expect(subject).to.have.property('from', '')
    })

    it('should set #releases', () => {
      expect(subject).to.have.property('releases', releases)
    })

    it('should set #types', () => {
      expect(subject).to.have.property('types').be.an('array').that.is.not.empty
      expect(subject).to.have.property('types').each.be.instanceof(CommitType)
    })
  })
})
