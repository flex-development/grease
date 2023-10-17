/**
 * @file Unit Tests - ChangelogQueryHandler
 * @module grease/changelog/queries/tests/unit/ChangelogQueryHandler
 */

import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { GitModule, GitService } from '#src/git'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
import { set, template } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../changelog.handler'
import ChangelogQuery from '../changelog.query'

describe('unit:changelog/queries/ChangelogQueryHandler', () => {
  let git: GitService
  let gitdir: string
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await (await Test.createTestingModule({
      imports: [CqrsModule, GitModule, LogModule],
      providers: [TestSubject, ValidationService]
    }).compile()).init()

    git = ref.get(GitService)
    gitdir = '__fixtures__/git/grease'
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let query: ChangelogQuery

    beforeAll(async () => {
      query = new ChangelogQuery({
        cwd: '__fixtures__/pkg/premajor',
        releases: 0,
        tagprefix: gc.tagprefix,
        to: sha
      })
    })

    beforeEach(() => {
      vi.spyOn(git, 'exec').mockImplementation(async () => {
        return fs.readFile(template('{gitdir}/tags.txt', { gitdir }), 'utf8')
      })

      vi.spyOn(git, 'log').mockImplementation(async () => {
        return fs.readFile(template('{gitdir}/commits.txt', { gitdir }), 'utf8')
      })
    })

    it('should return changlog entries array', async () => {
      // Act
      const result = await subject.execute(query)

      // Expect
      expect(set(result, '0.date', 'TODAY')).toMatchSnapshot()
    })
  })
})
