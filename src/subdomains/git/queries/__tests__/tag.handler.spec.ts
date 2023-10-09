/**
 * @file Unit Tests - TagQueryHandler
 * @module grease/git/queries/tests/unit/TagQueryHandler
 */

import { GitService } from '#src/git/providers'
import { LoggerService, ValidationService } from '#src/providers'
import { Test, type TestingModule } from '@nestjs/testing'
import fs from 'node:fs/promises'
import TestSubject from '../tag.handler'
import TagQuery from '../tag.query'

describe('unit:git/queries/TagQueryHandler', () => {
  let git: GitService
  let ref: TestingModule
  let subject: TestSubject

  beforeAll(async () => {
    ref = await Test.createTestingModule({
      providers: [GitService, LoggerService, TestSubject, ValidationService]
    }).compile()

    git = ref.get(GitService)
    subject = ref.get(TestSubject)
  })

  describe('#execute', () => {
    it('should return tags array with unstable tags', async () => {
      // Arrange
      vi.spyOn(git, 'tag').mockImplementationOnce(async () => {
        return fs.readFile('__fixtures__/git/mkbuild/tags.txt', 'utf8')
      })

      // Act
      const result = await subject.execute(new TagQuery())

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })

    it('should return tags array without unstable tags', async () => {
      // Arrange
      vi.spyOn(git, 'tag').mockImplementationOnce(async () => {
        return fs.readFile('__fixtures__/git/tutils/tags.txt', 'utf8')
      })

      // Act
      const result = await subject.execute(new TagQuery({
        tagprefix: 'tutils@',
        unstable: false
      }))

      // Expect
      expect(result).to.be.an('array').that.is.not.empty
      expect(result).toMatchSnapshot()
    })
  })
})
