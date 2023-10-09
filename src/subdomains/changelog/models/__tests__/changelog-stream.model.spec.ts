/**
 * @file Unit Tests - ChangelogStream
 * @module grease/changelog/models/tests/functional/ChangelogStream
 */

import sha from '#fixtures/git/grease/sha'
import gc from '#gc' assert { type: 'json' }
import { ChangelogOperation } from '#src/changelog/operations'
import { LoggerService } from '#src/providers'
import { cast, get, type Nullable } from '@flex-development/tutils'
import ChangelogFormatter from '../changelog-formatter.model'
import TestSubject from '../changelog-stream.model'

describe('unit:changelog/models/ChangelogStream', () => {
  let logger: LoggerService

  beforeAll(() => {
    logger = new LoggerService()
  })

  describe('constructor', () => {
    let operation: ChangelogOperation
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        logger,
        operation: operation = new ChangelogOperation({
          tagprefix: gc.tagprefix,
          to: sha
        })
      })
    })

    it('should initialize readable state', () => {
      expect(cast(get(subject, '_readableState'))).toMatchObject({
        closeEmitted: false,
        closed: false,
        constructed: true,
        defaultEncoding: 'utf8',
        destroyed: false,
        ended: false,
        errored: null,
        flowing: false,
        objectMode: true,
        reading: false
      })
    })

    it('should initialize writable state', () => {
      expect(cast(get(subject, '_writableState'))).toMatchObject({
        constructed: true,
        decodeStrings: false,
        defaultEncoding: 'utf8',
        destroyed: false,
        ended: false,
        errored: null,
        finished: false,
        objectMode: true,
        writing: false
      })
    })

    it('should set #allowHalfOpen', () => {
      expect(subject).to.have.property('allowHalfOpen', true)
    })

    it('should set #cdx', () => {
      expect(subject).to.have.property('cdx', 0)
    })

    it('should set #chunks', () => {
      expect(subject).to.have.deep.property('chunks', [null]).be.frozen
    })

    it('should set #formatter', () => {
      expect(subject)
        .to.have.property('formatter')
        .be.instanceof(ChangelogFormatter)
    })

    it('should set #logger', () => {
      expect(subject).to.have.property('logger').be.instanceof(LoggerService)
    })

    it('should set #operation', () => {
      expect(subject).to.have.property('operation', operation).be.frozen
    })

    it('should set #writer', () => {
      expect(subject).to.have.property('writer', process.stdout)
    })
  })

  describe('#read', () => {
    describe.each<[boolean, Nullable<string>]>([
      [false, null],
      [true, '']
    ])('operation.debug === %j', (debug, chunk) => {
      let subject: TestSubject

      beforeAll(() => {
        subject = new TestSubject({
          logger,
          operation: new ChangelogOperation({
            debug,
            tagprefix: gc.tagprefix,
            to: sha
          })
        })
      })

      it('should return changelog chunk', () => {
        expect(subject.read()).to.equal(chunk)
      })
    })
  })
})
