/**
 * @file Functional Tests - GitService
 * @module grease/git/providers/tests/functional/GitService
 */

import { LoggerService, ValidationService } from '#src/providers'
import type { Mock } from '#tests/interfaces'
import { join } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import TestSubject from '../git.service'

describe('functional:git/providers/GitService', () => {
  let exec: Mock<TestSubject['exec']>
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await Test.createTestingModule({
      providers: [LoggerService, TestSubject, ValidationService]
    }).compile()).get(TestSubject)
  })

  beforeEach(() => {
    vi.spyOn(subject, 'exec').mockImplementation(exec = vi.fn(async args => {
      return join(args, ' ')
    }).mockName('GitService#exec'))
  })

  describe('#log', () => {
    it('should execute git log command', async () => {
      // Act
      await subject.log()

      // Expect
      expect(exec).toHaveBeenCalledOnce()
      expect(exec).toHaveBeenCalledWith(['log'], undefined)
    })
  })

  describe('#origin', () => {
    it('should execute git config command', async () => {
      // Arrange
      const args: string[] = ['config', '--get', 'remote.origin.url']

      // Act
      await subject.origin()

      // Expect
      expect(exec).toHaveBeenCalledOnce()
      expect(exec).toHaveBeenCalledWith(args, undefined)
    })
  })

  describe('#push', () => {
    it('should execute git push command', async () => {
      // Act
      await subject.push()

      // Expect
      expect(exec).toHaveBeenCalledOnce()
      expect(exec).toHaveBeenCalledWith(['push'], undefined)
    })
  })

  describe('#tag', () => {
    it('should execute git tag command', async () => {
      // Act
      await subject.tag()

      // Expect
      expect(exec).toHaveBeenCalledOnce()
      expect(exec).toHaveBeenCalledWith(['tag'], undefined)
    })
  })
})
