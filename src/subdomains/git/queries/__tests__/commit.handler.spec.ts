/**
 * @file Unit Tests - CommitQueryHandler
 * @module grease/git/queries/tests/unit/CommitQueryHandler
 */

import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { GitService } from '#src/git/providers'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
import { template } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../commit.handler'
import CommitQuery from '../commit.query'

describe('unit:git/queries/CommitQueryHandler', () => {
  let git: GitService
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      imports: [LogModule],
      providers: [GitService, TestSubject, ValidationService]
    }).compile()

    git = ref.get(GitService)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    let version: string

    beforeAll(() => {
      version = '2.0.0'
    })

    beforeEach(() => {
      vi.spyOn(git, 'log').mockImplementationOnce(async () => {
        const id = `__fixtures__/git/grease/commits-from-${version}.txt`
        return fs.readFile(id, 'utf8')
      })
    })

    it('should return parsed commit array', async () => {
      // Act
      const result = await subject.execute(new CommitQuery({
        from: template('{tagprefix}{version}', {
          tagprefix: gc.tagprefix,
          version
        }),
        to: sha
      }))

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })
  })
})
