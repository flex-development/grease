/**
 * @file Unit Tests - GreaseService
 * @module grease/tests/unit/GreaseService
 */

import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import {
  BumpModule,
  RecommendedBump,
  type BumpOperationDTO
} from '#src/bump'
import {
  ChangelogModule,
  ChangelogStream,
  type ChangelogOperationDTO
} from '#src/changelog'
import { ConfigModule } from '#src/config'
import { ReleaseType } from '#src/enums'
import { GitModule, GitService, TagOperation } from '#src/git'
import { PackageManifest } from '#src/models'
import { LoggerService, ValidationService } from '#src/providers'
import { set } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import fs from 'node:fs/promises'
import tempfile from 'tempfile'
import TestSubject from '../grease.service'

describe('unit:GreaseService', () => {
  let raw_tags: string
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await (await Test.createTestingModule({
      imports: [
        BumpModule,
        ChangelogModule,
        ConfigModule,
        CqrsModule,
        GitModule
      ],
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).init()).get(TestSubject)

    raw_tags = '__fixtures__/git/grease/tags.txt'
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

  describe('#changelog', () => {
    let operation: ChangelogOperationDTO

    beforeAll(() => {
      operation = {
        outfile: tempfile({ extension: '.md' }),
        tagprefix: gc.tagprefix,
        to: sha,
        write: true
      }
    })

    it('should return changelog stream', async () => {
      // Act
      const result = await subject.changelog(operation)

      // Expect
      expect(result).to.be.instanceof(ChangelogStream)
      expect(result).to.have.property('chunks').be.an('array').of.length(2)
    })
  })

  describe('#recommend', () => {
    beforeEach(() => {
      vi.spyOn(GitService.prototype, 'tag').mockImplementation(async () => {
        return fs.readFile(raw_tags, 'utf8')
      })
    })

    it('should return recommended version bump', async () => {
      // Act
      const result = await subject.recommend({
        tagprefix: gc.tagprefix,
        to: sha
      })

      // Expect
      expect(result).to.be.instanceof(RecommendedBump)
      expect(result).toMatchSnapshot()
    })
  })

  describe('#tag', () => {
    beforeEach(() => {
      vi.spyOn(GitService.prototype, 'tag').mockImplementation(async () => '')
    })

    it('should return executed tag operation', async () => {
      // Act
      const result = await subject.tag({
        sign: true,
        tag: '3.0.0-alpha.1',
        tagprefix: gc.tagprefix
      })

      // Expect
      expect(result).to.be.instanceof(TagOperation)
      expect(set(result, 'cwd', '$PWD')).toMatchSnapshot()
    })
  })

  describe('#tags', () => {
    beforeEach(() => {
      vi.spyOn(GitService.prototype, 'tag').mockImplementation(async () => {
        return fs.readFile(raw_tags, 'utf8')
      })
    })

    it('should return tags array', async () => {
      // Act
      const results = await subject.tags()

      // Expect
      expect(results).to.be.an('array').that.is.not.empty
      expect(results).toMatchSnapshot()
    })
  })
})
