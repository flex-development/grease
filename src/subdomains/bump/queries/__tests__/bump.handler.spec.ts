/**
 * @file Unit Tests - BumpQueryHandler
 * @module grease/bump/queries/tests/unit/BumpQueryHandler
 */

import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { RecommendedBump } from '#src/bump/models'
import { GitModule, GitService } from '#src/git'
import { LoggerService, ValidationService } from '#src/providers'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../bump.handler'
import BumpQuery from '../bump.query'

describe('unit:bump/queries/BumpQueryHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await (await Test.createTestingModule({
      imports: [CqrsModule, GitModule],
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).init()).get(TestSubject)
  })

  describe('#execute', () => {
    let gitdir: string
    let logs: string
    let tags: string

    beforeAll(async () => {
      gitdir = '__fixtures__/git/grease'

      logs = await fs.readFile(gitdir + '/commits-from-2.0.0.txt', 'utf8')
      tags = await fs.readFile(gitdir + '/tags.txt', 'utf8')
    })

    beforeEach(() => {
      vi.spyOn(GitService.prototype, 'log').mockImplementation(async () => logs)
      vi.spyOn(GitService.prototype, 'tag').mockImplementation(async () => tags)
    })

    it('should return recommended version bump', async () => {
      // Act
      const result = await subject.execute(new BumpQuery({
        tagprefix: gc.tagprefix,
        to: sha
      }))

      // Expect
      expect(result).to.be.instanceof(RecommendedBump)
      expect(result).toMatchSnapshot()
    })
  })
})
