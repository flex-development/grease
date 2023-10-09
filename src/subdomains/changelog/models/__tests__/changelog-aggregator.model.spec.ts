/**
 * @file Unit Tests - ChangelogAggregator
 * @module grease/changelog/models/tests/unit/ChangelogAggregator
 */

import types from '#fixtures/changelog/types'
import cqh from '#fixtures/query-commit.handler'
import { Commit, CommitQuery } from '#src/git'
import { define } from '@flex-development/tutils'
import TestSubject from '../changelog-aggregator.model'

describe('unit:changelog/models/ChangelogAggregator', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = new TestSubject(types, await cqh.execute(new CommitQuery({
      from: 'grease@1.1.0',
      to: 'grease@2.0.0'
    })))
  })

  describe('#breaks', () => {
    it('should return sorted breaking changes array', () => {
      expect(subject.breaks).toMatchSnapshot()
    })
  })

  describe('#groups', () => {
    it('should return sorted commit groups array', () => {
      expect(subject.groups).toMatchSnapshot()
    })
  })

  describe('#mentions', () => {
    let commits: Commit[]
    let subject: TestSubject

    beforeAll(async () => {
      commits = await cqh.execute(new CommitQuery({ to: 'grease@1.0.0' }))

      subject = define(new TestSubject(types, commits), 'commits', {
        value: [
          { mentions: ['@dependabot'], sha: faker.git.commitSha() },
          { mentions: ['@dependabot'], sha: faker.git.commitSha() },
          { mentions: ['@dependabot'], sha: faker.git.commitSha() }
        ]
      })
    })

    it('should return mentions array', () => {
      expect(subject.mentions).toMatchSnapshot()
    })
  })

  describe('#references', () => {
    it('should return references array', () => {
      expect(subject.references).toMatchSnapshot()
    })
  })
})
