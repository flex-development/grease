/**
 * @file Functional Tests - TagOperationHandler
 * @module grease/git/operations/tests/functional/TagOperationHandler
 */

import gc from '#gc' assert { type: 'json' }
import { GitService } from '#src/git/providers'
import { LoggerService, UserLogLevel } from '#src/log'
import { ValidationService } from '#src/providers'
import type { Mock } from '#tests/interfaces'
import { template } from '@flex-development/tutils'
import { Test } from '@nestjs/testing'
import TestSubject from '../tag.handler'
import TagOperation from '../tag.operation'

describe('functional:git/operations/TagOperationHandler', () => {
  let push: Mock<GitService['push']>
  let start: Mock<LoggerService['start']>
  let subject: TestSubject
  let success: Mock<LoggerService['success']>
  let tag: Mock<GitService['tag']>

  beforeAll(async () => {
    start = vi.fn().mockName('LoggerService#start')
    success = vi.fn().mockName('LoggerService#success')

    subject = (await Test.createTestingModule({
      providers: [
        TestSubject,
        ValidationService,
        {
          provide: GitService,
          useValue: {
            push: push = vi.fn().mockName('GitService#push'),
            tag: tag = vi.fn(async () => '').mockName('GitService#tag')
          }
        },
        {
          provide: LoggerService,
          useValue: {
            withTag: vi.fn(() => ({
              options: { tag: 'grease:tag' },
              start,
              success,
              sync: vi.fn().mockName('LoggerService#sync')
            })).mockName('LoggerService#withTag')
          }
        }
      ]
    }).compile()).get(TestSubject)
  })

  describe('#execute', () => {
    let operation: TagOperation

    beforeAll(async () => {
      operation = new TagOperation({
        force: true,
        level: UserLogLevel.SILENT,
        message: 'release: {tag}',
        object: '^HEAD',
        push: true,
        sign: 'keyid',
        tag: '3.0.0-test.1',
        tagprefix: gc.tagprefix
      })
    })

    beforeEach(async () => {
      await subject.execute(operation)
    })

    it('should create tag object', () => {
      // Arrange
      const args: string[] = [
        '--annotate',
        '--force',
        `--local-user=${operation.sign}`,
        `--message="${template(operation.message, { tag: operation.tag })}"`,
        '',
        operation.tag,
        operation.object
      ]

      // Expect
      expect(start).toHaveBeenCalledWith('creating tag', operation.tag)
      expect(tag).toHaveBeenCalledWith(args, operation)
      expect(success).toHaveBeenCalledWith('created tag', operation.tag)
    })

    it('should push tag to remote', () => {
      // Arrange
      const { remote, tag } = operation

      // Expect
      expect(start).toHaveBeenCalledWith('pushing', tag)
      expect(push).toHaveBeenCalledWith(['-f', remote, tag], operation)
      expect(success).toHaveBeenCalledWith('pushed', tag, 'to', remote)
    })

    it('should verify gpg signature', () => {
      expect(start).toHaveBeenCalledWith('verifying gpg signature')
      expect(tag).toHaveBeenCalledWith(['--verify', operation.tag], operation)
      expect(success).toHaveBeenCalledWith('')
    })
  })
})
