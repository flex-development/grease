/**
 * @file Unit Tests - ChangelogOperationHandler
 * @module grease/changelog/operations/tests/unit/ChangelogOperationHandler
 */

import today from '#fixtures/changelog/today'
import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { ChangelogStream } from '#src/changelog/models'
import { ChangelogQueryHandler } from '#src/changelog/queries'
import { GitModule } from '#src/git'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
import { CqrsModule } from '@nestjs/cqrs'
import { Test } from '@nestjs/testing'
import tempfile from 'tempfile'
import TestSubject from '../changelog.handler'
import ChangelogOperation from '../changelog.operation'

describe('unit:changelog/operations/ChangelogOperationHandler', () => {
  let subject: TestSubject

  beforeAll(async () => {
    subject = (await (await Test.createTestingModule({
      imports: [CqrsModule, GitModule, LogModule],
      providers: [ChangelogQueryHandler, TestSubject, ValidationService]
    }).compile()).init()).get(TestSubject)

    vi.setSystemTime(today)
  })

  describe('#execute', () => {
    let operation: ChangelogOperation

    beforeAll(() => {
      operation = new ChangelogOperation({
        outfile: tempfile({ extension: 'md' }),
        tagprefix: gc.tagprefix,
        to: sha,
        write: true
      })
    })

    it('should return changelog stream', async () => {
      expect(await subject.execute(operation)).to.be.instanceof(ChangelogStream)
    })
  })
})
