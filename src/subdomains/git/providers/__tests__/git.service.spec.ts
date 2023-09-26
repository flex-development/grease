/**
 * @file Unit Tests - GitService
 * @module grease/git/providers/tests/unit/GitService
 */

import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import pkg from '#pkg' assert { type: 'json' }
import type { ICommit } from '#src/git/interfaces'
import { LoggerService, ValidationService } from '#src/providers'
import type { Nullable } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../git.service'

describe('unit:git/providers/GitService', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()

    subject = ref.get(TestSubject)
  })

  describe('#commits', () => {
    it('should return parsed commit array', async () => {
      // Arrange
      vi.spyOn(subject, 'log').mockImplementationOnce(async () => {
        return fs.readFile(
          '__fixtures__/git/grease/commits-from-2.0.0.txt',
          'utf8'
        )
      })

      // Act + Expect
      expect(await subject.commits({ to: sha })).to.be.an('array').of.length(26)
    })
  })

  describe('#exec', () => {
    it('should return command output', async () => {
      expect(await subject.exec(['log'])).to.be.a('string').that.is.not.empty
    })

    it('should throw if command fails', async () => {
      // Arrange
      let error!: Error

      // Act
      try {
        await subject.exec(['describe', sha.slice(-7)])
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.be.instanceof(Error)
      expect(error).to.have.property('cause').with.all.keys(['cmd', 'code'])
      expect(error).to.have.property('message').not.startWith('fatal:')
    })
  })

  describe('#log', () => {
    it('should return command output', async () => {
      expect(await subject.log([])).to.be.a('string').that.is.not.empty
    })
  })

  describe('#origin', () => {
    it('should return remote origin url', async () => {
      expect(await subject.origin()).to.startWith(pkg.homepage)
    })
  })

  describe('#parent', () => {
    it.each<[string, Nullable<string>, Pick<ICommit, 'sha'>]>([
      ['null', null, { sha: faker.git.commitSha() }],
      ['oldest tag containing commit', 'grease@2.0.0', {
        sha: 'e9144b57b92f0236528974df9fbd3610bc191a02'
      }]
    ])('should return %s', async (_, expected, commit) => {
      expect(await subject.parent(commit, { tagprefix })).to.equal(expected)
    })
  })

  describe('#tags', () => {
    it('should return tags array with unstable tags', async () => {
      // Arrange
      vi.spyOn(subject, 'exec').mockImplementationOnce(async () => {
        return fs.readFile('__fixtures__/git/mkbuild/tags.txt', 'utf8')
      })

      // Act
      const result = await subject.tags()

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })

    it('should return tags array without unstable tags', async () => {
      // Arrange
      vi.spyOn(subject, 'exec').mockImplementationOnce(async () => {
        return fs.readFile('__fixtures__/git/tutils/tags.txt', 'utf8')
      })

      // Act
      const result = await subject.tags({
        tagprefix: 'tutils@',
        unstable: false
      })

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })
  })
})
