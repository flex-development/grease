/**
 * @file Unit Tests - CommitGroup
 * @module grease/changelog/models/tests/unit/CommitGroup
 */

import git from '#fixtures/git.service'
import sha from '#fixtures/git/grease/sha'
import { Commit } from '#src/git'
import { Type } from '@flex-development/commitlint-config'
import { select } from '@flex-development/tutils'
import TestSubject from '../commit-group.model'

describe('unit:changelog/models/CommitGroup', () => {
  let commits: Commit[]
  let key: string
  let section: string
  let subject: TestSubject

  beforeAll(async () => {
    subject = new TestSubject({
      commits: commits = select(
        await git.commits({ from: 'grease@2.0.0', to: sha }),
        commit => commit.type === Type.FEAT
      ),
      key: key = Type.FEAT,
      section: section = ':sparkles: Features'
    })
  })

  describe('constructor', () => {
    it('should set #commits', () => {
      expect(subject).to.have.deep.property('commits', commits)
    })

    it('should set #hidden', () => {
      // Arrange
      const cases: ConstructorParameters<typeof TestSubject>[] = [
        [{ commits, hidden: true, key, section }],
        [{ commits, key, section }],
        [{ commits, key: '' }],
        [{ key: Type.RELEASE }]
      ]

      // Act + Expect
      cases.forEach(([opts]) => {
        const result = new TestSubject(opts)
        const hidden = opts.hidden ?? (!opts.commits?.length || !opts.section)

        expect(result).to.have.property('hidden', hidden)
      })
    })

    it('should set #key', () => {
      expect(subject).to.have.property('key', key)
    })

    it('should set #section', () => {
      // Arrange
      const cases: ConstructorParameters<typeof TestSubject>[] = [
        [{ key: Type.TEST, section: ':white_check_mark: Testing' }],
        [{ key: Type.RELEASE }]
      ]

      // Act + Expect
      cases.forEach(([opts]) => {
        const result = new TestSubject(opts)

        expect(result).to.have.property('section', opts.section ?? opts.key)
      })
    })
  })

  describe('#toJSON', () => {
    it('should return json-serializable commit group', () => {
      expect(subject.toJSON()).toMatchSnapshot()
    })
  })
})
