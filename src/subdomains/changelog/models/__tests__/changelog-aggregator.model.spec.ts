/**
 * @file Unit Tests - ChangelogAggregator
 * @module grease/changelog/models/tests/unit/ChangelogAggregator
 */

import types from '#fixtures/changelog/types'
import git from '#fixtures/git.service'
import { define } from '@flex-development/tutils'
import TestSubject from '../changelog-aggregator.model'

describe('unit:changelog/models/ChangelogAggregator', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = new TestSubject(
      types,
      await git.commits({ from: 'grease@1.1.0', to: 'grease@2.0.0' })
    )
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
    let subject: TestSubject

    beforeAll(async () => {
      subject = define(
        new TestSubject(types, await git.commits({ to: 'grease@1.0.0' })),
        'commits',
        {
          value: [
            { mentions: ['@dependabot'], sha: faker.git.commitSha() },
            { mentions: ['@dependabot'], sha: faker.git.commitSha() },
            { mentions: ['@dependabot'], sha: faker.git.commitSha() }
          ]
        }
      )
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
