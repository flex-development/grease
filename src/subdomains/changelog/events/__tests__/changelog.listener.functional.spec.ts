/**
 * @file Functional Tests - ChangelogEventListener
 * @module grease/changelog/events/tests/functional/ChangelogEventListener
 */

import today from '#fixtures/changelog/today'
import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { ChangelogStream } from '#src/changelog/models'
import { ChangelogOperation } from '#src/changelog/operations'
import { ChangelogQueryHandler } from '#src/changelog/queries'
import { GitModule } from '#src/git'
import { LogModule, LoggerService, UserLogLevel } from '#src/log'
import { ValidationService } from '#src/providers'
import type { Fn } from '@flex-development/tutils'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import tempfile from 'tempfile'
import ChangelogEvent from '../changelog.event'
import TestSubject from '../changelog.listener'

describe('functional:changelog/events/ChangelogEventListener', () => {
  beforeAll(() => {
    vi.setSystemTime(today)
  })

  describe('constructor', () => {
    beforeEach(async () => {
      vi.spyOn(LoggerService.prototype, 'withTag')

      await Test.createTestingModule({
        imports: [LogModule],
        providers: [TestSubject]
      }).compile()
    })

    it('should initialize logger', () => {
      expect(LoggerService.prototype.withTag).toHaveBeenCalled()
      expect(LoggerService.prototype.withTag).toHaveBeenCalledWith('changelog')
    })
  })

  describe('#handle', () => {
    let event: ChangelogEvent
    let operation: ChangelogOperation
    let ref: TestingModule
    let stream: ChangelogStream
    let subject: TestSubject

    beforeAll(async () => {
      ref = await (await Test.createTestingModule({
        imports: [CqrsModule, GitModule, LogModule],
        providers: [ChangelogQueryHandler, TestSubject, ValidationService]
      }).compile()).init()

      subject = ref.get(TestSubject)

      operation = new ChangelogOperation({
        level: UserLogLevel.SILENT,
        outfile: tempfile({ extension: 'md' }),
        tagprefix: gc.tagprefix,
        to: sha,
        write: true
      })

      stream = new ChangelogStream({
        entries: await ref.get(ChangelogQueryHandler).execute(operation),
        logger: ref.get(LoggerService),
        operation
      })

      event = new ChangelogEvent(stream, operation)
    })

    beforeEach(() => {
      vi.spyOn(ChangelogStream.prototype, 'on')
      vi.spyOn(ChangelogStream.prototype, 'print')
      vi.spyOn(LoggerService.prototype, 'sync')

      subject.handle(event)
    })

    it('should handle changelog stream errors', () => {
      // Arrange
      const fn: Fn = expect.any(Function)

      // Expect
      expect(ChangelogStream.prototype.on).toHaveBeenCalledWith('error', fn)
    })

    it('should print changelog stream', () => {
      expect(ChangelogStream.prototype.print).toHaveBeenCalledOnce()
      expect(ChangelogStream.prototype.print).toHaveBeenCalledWith()
    })

    it('should sync logger settings', () => {
      expect(LoggerService.prototype.sync).toHaveBeenCalledOnce()
      expect(LoggerService.prototype.sync).toHaveBeenCalledWith(operation)
    })
  })
})
