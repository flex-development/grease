/**
 * @file Unit Tests - ChangelogFormatter
 * @module grease/changelog/models/tests/unit/ChangelogFormatter
 */

import today from '#fixtures/changelog/today'
import types from '#fixtures/changelog/types'
import git from '#fixtures/git.service'
import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import semtag from '#tests/utils/semtag'
import { template, type Assign, type Pick } from '@flex-development/tutils'
import fs from 'node:fs/promises'
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
        release: semtag('1.0.0', tagprefix),
        tagprefix,
        to: semtag('1.0.0', tagprefix)
      }],
      ['new', {
        from: '1.0.0-alpha.20',
        release: '1.0.0-alpha.21',
        tagprefix: '',
        to: '1.0.0-alpha.21'
      }],
      ['unreleased', {
        from: semtag('2.0.0', tagprefix),
        release: semtag('2.0.0', tagprefix, sha),
        tagprefix,
        to: sha
      }]
    ])('%s entry', (_, opts) => {
      let entry: ChangelogEntry

      beforeEach(async () => {
        if (opts.tagprefix !== tagprefix) {
          vi.spyOn(git, 'exec').mockImplementationOnce(async () => {
            return fs.readFile('__fixtures__/git/mkbuild/tags.txt', 'utf8')
          })

          vi.spyOn(git, 'log').mockImplementationOnce(async () => {
            const t: string = '__fixtures__/git/mkbuild/commits-from-{from}.txt'
            return fs.readFile(template(t, { from: opts.from }), 'utf8')
          })

          vi.spyOn(git, 'origin').mockImplementationOnce(async () => {
            return 'https://github.com/flex-development/mkbuild.git'
          })
        }

        entry = new ChangelogEntry({
          ...opts,
          Aggregator: ChangelogAggregator,
          commits: await git.commits(opts),
          tags: await git.tags(opts),
          types
        })
      })

      it('should return formatted changelog entry', () => {
        expect(subject.formatEntry(entry)).toMatchSnapshot()
      })
    })
  })
})
