/**
 * @file Unit Tests - GitService
 * @module grease/providers/tests/unit/GitService
 */

import sha from '#fixtures/git/grease/sha'
import { Test, type TestingModule } from '@nestjs/testing'
import consola from 'consola'
import fs from 'node:fs/promises'
import TestSubject from '../git.service'
import ValidationService from '../validation.service'

describe('unit:providers/GitService', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [TestSubject, ValidationService]
    }).compile()

    consola.mockTypes(() => vi.fn())
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
        await subject.exec(['describe', sha.slice(-7)], { debug: true })
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
