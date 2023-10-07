/**
 * @file Unit Tests - GitService
 * @module grease/git/providers/tests/unit/GitService
 */

import sha from '#fixtures/git/grease/sha'
import tagprefix from '#fixtures/git/grease/tagprefix'
import pkg from '#pkg' assert { type: 'json' }
import { LoggerService, ValidationService } from '#src/providers'
import { template } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../git.service'

describe('unit:git/providers/GitService', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  describe('#commits', () => {
    let version: string

    beforeAll(() => {
      version = '2.0.0'
    })

    it('should return parsed commit array', async () => {
      // Arrange
      vi.spyOn(subject, 'log').mockImplementationOnce(async () => {
        const id = `__fixtures__/git/grease/commits-from-${version}.txt`
        return fs.readFile(id, 'utf8')
      })

      // Act
      const result = await subject.commits({
        from: template('{tagprefix}{version}', { tagprefix, version }),
        to: sha
      })

      // Expect
      expect(result).toMatchSnapshot()
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
      // Arrange
      const url: string = pkg.repository.replace(/\.git$/, '')

      // Act + Expect
      expect(await subject.origin()).to.startWith(url)
    })
  })

  describe('#tag', () => {
    it('should return command output', async () => {
      // Arrange
      const args: string[] = ['--sort', '-creatordate', '--list']

      // Act + Expect
      expect(await subject.tag(args)).to.include(tagprefix)
    })
  })

  describe('#tags', () => {
    it('should return tags array with unstable tags', async () => {
      // Arrange
      vi.spyOn(subject, 'tag').mockImplementationOnce(async () => {
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
      vi.spyOn(subject, 'tag').mockImplementationOnce(async () => {
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
