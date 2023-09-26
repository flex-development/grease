/**
 * @file Unit Tests - GreaseService
 * @module grease/tests/GreaseService
 */

import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import {
  BumpModule,
  BumpQuery,
  RecommendedBump,
  type BumpOperationDTO
} from '#src/bump'
import { ReleaseType } from '#src/enums'
import { GitModule, GitService } from '#src/git'
import { PackageManifest } from '#src/models'
import { LoggerService, ValidationService } from '#src/providers'
import type { Spy } from '#tests/interfaces'
import type { Partial } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import TestSubject from '../grease.service'

describe('unit:GreaseService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await (await Test.createTestingModule({
      imports: [BumpModule, CqrsModule.forRoot(), GitModule],
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).init()).get(TestSubject)
  })

  describe('#bump', () => {
    let operation: BumpOperationDTO

    beforeAll(() => {
      operation = {
        cwd: '__fixtures__/pkg/premajor',
        preid: 'rc',
        release: ReleaseType.PREMAJOR
      }
    })

    it('should return package manifest', async () => {
      // Act
      const result = await subject.bump(operation)

      // Expect
      expect(result).to.be.instanceof(PackageManifest)
      expect(result.pkg).toMatchSnapshot()
    })
  })

  describe('#recommend', () => {
    let query: Partial<BumpQuery>
    let tags: Spy<GitService['tags']>

    beforeAll(() => {
      query = { tagprefix, to: sha }
    })

    beforeEach(() => {
      tags = vi.spyOn(GitService.prototype, 'tags')
      tags.mockImplementationOnce(async () => ['grease@2.0.0'])
    })

    it('should return recommended version bump', async () => {
      // Act
      const result = await subject.recommend(query)

      // Expect
      expect(result).to.be.instanceof(RecommendedBump)
      expect(result).toMatchSnapshot()
    })
  })
})
