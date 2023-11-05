/**
 * @file Unit Tests - ChangelogEntry
 * @module grease/changelog/models/tests/unit/ChangelogEntry
 */

import today from '#fixtures/changelog/today'
import sha from '#fixtures/git/grease/sha'
import cqh from '#fixtures/query-commit.handler'
import tqh from '#fixtures/query-tag.handler'
import gc from '#gc' assert { type: 'json' }
import { TYPES } from '#src/changelog/constants'
import { CommitQuery, GitService, TagQuery } from '#src/git'
import { at, select, template } from '@flex-development/tutils'
import json5 from 'json5'
import fs from 'node:fs/promises'
import util from 'node:util'
import Aggregator from '../changelog-aggregator.model'
import TestSubject, { type ChangelogEntryDTO } from '../changelog-entry.model'
import CommitGroup from '../commit-group.model'
import CommitType from '../commit-type.model'

describe('unit:changelog/models/ChangelogEntry', () => {
  let from: string
  let opts: ChangelogEntryDTO
  let subject: TestSubject

  beforeAll(async () => {
    vi.setSystemTime(today)
  })

  beforeEach(async () => {
    vi.spyOn(GitService.prototype, 'tag').mockImplementation(async () => {
      return fs.readFile('__fixtures__/git/grease/tags.txt', 'utf8')
    })

    subject = new TestSubject(opts = {
      Aggregator,
      commits: await cqh.execute(new CommitQuery({
        from: from = gc.tagprefix + '2.0.0',
        to: sha
      })),
      release: template('{from}+{sha}', { from, sha }),
      tagprefix: gc.tagprefix,
      tags: await tqh.execute(new TagQuery({ tagprefix: gc.tagprefix })),
      types: select(TYPES, null, type => new CommitType(type))
    })
  })

  describe('constructor', () => {
    it('should set #aggregator', () => {
      expect(subject).to.have.property('aggregator').be.instanceof(Aggregator)
    })

    it('should set #breaks', () => {
      expect(subject)
        .to.have.property('breaks')
        .be.an('array').that.is.not.empty
    })

    it('should set #date', () => {
      expect(subject).to.have.property('date', today.replace(/T.+/, ''))
    })

    it('should set #groups', () => {
      expect(subject)
        .to.have.property('groups')
        .each.be.instanceof(CommitGroup)
        .and.not.empty
    })

    it('should set #key', () => {
      expect(subject).to.have.property('key', at(opts.commits, 0))
    })

    it('should set #patch', () => {
      expect(subject).to.have.property('patch', false)
    })

    it('should set #prerelease', () => {
      expect(subject).to.have.property('prerelease', false)
    })

    it('should set #previous', () => {
      expect(subject).to.have.property('previous', at(opts.tags, 0))
    })

    it('should set #release', () => {
      expect(subject).to.have.property('release', opts.release)
    })

    it('should throw if key commit is not found', () => {
      expect(() => {
        return new TestSubject({ ...opts, commits: [] })
      }).to.throw(Error, 'key commit not found')
    })
  })

  describe('#[util.inspect.custom]', () => {
    it('should return inspection string', () => {
      expect(json5.parse(util.inspect(subject))).to.eql(subject.toJSON())
    })
  })

  describe('#toJSON', () => {
    it('should return json-serializable changelog entry', () => {
      expect(subject.toJSON()).toMatchSnapshot()
    })
  })
})
