/**
 * @file Unit Tests - GitService
 * @module grease/providers/tests/unit/GitService
 */

import type { EmptyString } from '@flex-development/tutils'
import { Test, type TestingModule } from '@nestjs/testing'
import consola from 'consola'
import fs from 'node:fs/promises'
import TestSubject from '../git.service'

describe('unit:providers/GitService', () => {
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    consola.mockTypes(() => vi.fn())
    ref = await Test.createTestingModule({ providers: [TestSubject] }).compile()
    subject = ref.get(TestSubject)
  })

  describe('#commits', () => {
    it('should return parsed commit array', async () => {
      // Arrange
      vi.spyOn(subject, 'log').mockImplementationOnce(async () => ({
        stderr: '',
        stdout: await fs.readFile('__fixtures__/commits/mkbuild.txt', 'utf8')
      }))

      // Act
      const result = await subject.commits()

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })
  })

  describe('#log', () => {
    it('should return command output', async () => {
      // Act
      const result = await subject.log(['HEAD'], { debug: true })

      // Expect
      expect(result).to.have.property('stderr').be.a('string').that.is.empty
      expect(result).to.have.property('stdout').startWith('commit')
    })
  })

  describe('#tags', () => {
    let stderr: EmptyString
    let tagprefix: string

    beforeAll(() => {
      stderr = ''
      tagprefix = 'tutils@'
    })

    it('should return tags array with unstable tags', async () => {
      // Arrange
      vi.spyOn(subject, 'log').mockImplementationOnce(async () => ({
        stderr,
        stdout: await fs.readFile('__fixtures__/tags/mkbuild.txt', 'utf8')
      }))

      // Act
      const result = await subject.tags()

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })

    it('should return tags array without unstable tags', async () => {
      // Arrange
      vi.spyOn(subject, 'log').mockImplementationOnce(async () => ({
        stderr,
        stdout: await fs.readFile('__fixtures__/tags/tutils.txt', 'utf8')
      }))

      // Act
      const result = await subject.tags({ tagprefix, unstable: false })

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })
  })
})
