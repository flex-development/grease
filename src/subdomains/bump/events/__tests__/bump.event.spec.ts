/**
 * @file Unit Tests - BumpEvent
 * @module grease/bump/events/tests/unit/BumpEvent
 */

import { BumpQuery } from '#src/bump/queries'
import { Version } from '#src/models'
import TestSubject from '../bump.event'

describe('unit:bump/events/BumpEvent', () => {
  describe('constructor', () => {
    let context: BumpQuery
    let payload: Version
    let subject: TestSubject

    beforeAll(() => {
      context = new BumpQuery()
      payload = new Version(faker.system.semver())
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
