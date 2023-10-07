/**
 * @file Unit Tests - GreaseConfig
 * @module grease/config/models/tests/unit/GreaseConfig
 */

import { ChangelogOperation } from '#src/changelog'
import TestSubject from '../grease-config.model'

describe('unit:config/models/GreaseConfig', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('constructor', () => {
    it('should set #changelog', () => {
      expect(subject)
        .to.have.property('changelog')
        .be.instanceof(ChangelogOperation)
    })
  })
})
