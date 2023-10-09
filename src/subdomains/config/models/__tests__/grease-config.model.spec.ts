/**
 * @file Unit Tests - GreaseConfig
 * @module grease/config/models/tests/unit/GreaseConfig
 */

import { ChangelogOperation } from '#src/changelog'
import { TagOperation } from '#src/git'
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

    it('should set #tag', () => {
      expect(subject).to.have.property('tag').be.instanceof(TagOperation)
    })
  })
})
