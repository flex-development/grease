/**
 * @file Unit Tests - BumpEvent
 * @module grease/bump/events/tests/unit/BumpEvent
 */

import { PackageManifest, type Manifest } from '#src/models'
import { GlobalOptions } from '#src/options'
import TestSubject from '../bump.event'

describe('unit:bump/events/BumpEvent', () => {
  describe('constructor', () => {
    let context: GlobalOptions
    let payload: Manifest
    let subject: TestSubject

    beforeAll(() => {
      context = new GlobalOptions()
      payload = new PackageManifest()
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
