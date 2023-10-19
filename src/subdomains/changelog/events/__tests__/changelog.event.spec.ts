/**
 * @file Unit Tests - ChangelogEvent
 * @module grease/changelog/events/tests/unit/ChangelogEvent
 */

import { ChangelogStream } from '#src/changelog/models'
import { ChangelogOperation } from '#src/changelog/operations'
import { LoggerService } from '#src/log'
import TestSubject from '../changelog.event'

describe('unit:changelog/events/ChangelogEvent', () => {
  describe('constructor', () => {
    let operation: ChangelogOperation
    let payload: ChangelogStream
    let subject: TestSubject

    beforeAll(() => {
      operation = new ChangelogOperation()
      payload = new ChangelogStream({ logger: new LoggerService(), operation })
      subject = new TestSubject(payload, operation)
    })

    it('should set #context', () => {
      expect(subject).to.have.property('context', operation)
    })

    it('should set #payload', () => {
      expect(subject).to.have.property('payload', payload)
    })
  })
})
