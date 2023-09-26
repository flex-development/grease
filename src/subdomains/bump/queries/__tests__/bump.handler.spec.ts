/**
 * @file Unit Tests - BumpQueryHandler
 * @module grease/bump/queries/tests/unit/BumpQueryHandler
 */

import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import { RecommendedBump } from '#src/bump/models'
import { GitService } from '#src/git'
import { LoggerService, ValidationService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import { Test } from '@nestjs/testing'
import TestSubject from '../bump.handler'
import BumpQuery from '../bump.query'

describe('unit:bump/queries/BumpQueryHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      providers: [GitService, LoggerService, TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#execute', () => {
    let query: BumpQuery
    let tags: Spy<GitService['tags']>

    beforeAll(() => {
      query = new BumpQuery({ tagprefix, to: sha })
    })

    beforeEach(() => {
      tags = vi.spyOn(GitService.prototype, 'tags')
      tags.mockImplementationOnce(async () => ['grease@2.0.0'])
    })

    it('should return recommended version bump', async () => {
      // Act
      const result = await subject.execute(query)

      // Expect
      expect(result).to.be.instanceof(RecommendedBump)
      expect(result).toMatchSnapshot()
    })
  })
})
