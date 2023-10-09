/**
 * @file Unit Tests - ChangelogFormatter
 * @module grease/changelog/models/tests/unit/ChangelogFormatter
 */

import today from '#fixtures/changelog/today'
import types from '#fixtures/changelog/types'
import sha from '#fixtures/git/grease/sha'
import cqh from '#fixtures/query-commit.handler'
import tqh from '#fixtures/query-tag.handler'
import gc from '#gc' assert { type: 'json' }
import { CommitQuery, TagQuery } from '#src/git'
import semtag from '#tests/utils/semtag'
import type { Assign, Pick } from '@flex-development/tutils'
import ChangelogAggregator from '../changelog-aggregator.model'
import ChangelogEntry, {
  type ChangelogEntryDTO
} from '../changelog-entry.model'
import TestSubject from '../changelog-formatter.model'

describe('unit:changelog/models/ChangelogFormatter', () => {
  let subject: TestSubject

  beforeAll(() => {
    vi.setSystemTime(today)
    subject = new TestSubject()
  })

  describe('#formatEntry', async () => {
    describe.each<[
      string,
      Assign<Pick<ChangelogEntryDTO, 'release' | 'tagprefix'>, {
        from?: string
        to: string
      }>
    ]>([
      ['first', {
        release: semtag('1.0.0', gc.tagprefix),
        tagprefix: gc.tagprefix,
        to: semtag('1.0.0', gc.tagprefix)
      }],
      ['unreleased', {
        from: semtag('2.0.0', gc.tagprefix),
        release: semtag('2.0.0', gc.tagprefix, sha),
        tagprefix: gc.tagprefix,
        to: sha
      }]
    ])('%s entry', (_, opts) => {
      let entry: ChangelogEntry

      beforeEach(async () => {
        entry = new ChangelogEntry({
          ...opts,
          Aggregator: ChangelogAggregator,
          commits: await cqh.execute(new CommitQuery(opts)),
          tags: await tqh.execute(new TagQuery(opts)),
          types
        })
      })

      it('should return formatted changelog entry', () => {
        expect(subject.formatEntry(entry)).toMatchSnapshot()
      })
    })
  })
})
