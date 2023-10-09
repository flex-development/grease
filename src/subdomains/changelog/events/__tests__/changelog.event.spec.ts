/**
 * @file Unit Tests - ChangelogEvent
 * @module grease/changelog/events/tests/unit/ChangelogEvent
 */

import logger from '#fixtures/logger.service'
import { ChangelogStream } from '#src/changelog/models'
import { ChangelogOperation } from '#src/changelog/operations'
import { GlobalOptions } from '#src/options'
import TestSubject from '../changelog.event'

describe('unit:changelog/events/ChangelogEvent', () => {
  describe('constructor', () => {
    let context: GlobalOptions
    let operation: ChangelogOperation
    let payload: ChangelogStream
    let subject: TestSubject

    beforeAll(() => {
      context = new GlobalOptions()
      operation = new ChangelogOperation()
      payload = new ChangelogStream({ logger, operation })

      subject = new TestSubject(payload, context)
    })

    it('should set #context', () => {
      expect(subject).to.have.property('context', context)
    })

    it('should set #payload', () => {
      expect(subject).to.have.property('payload', payload)
    })
  })
})