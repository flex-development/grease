/**
 * @file Unit Tests - TagOperation
 * @module grease/git/operations/tests/unit/TagOperation
 */

import gc from '#gc' assert { type: 'json' }
import type { SemanticVersion } from '@flex-development/pkg-types'
import TestSubject from '../tag.operation'

describe('unit:git/operations/TagOperation', () => {
  describe('constructor', () => {
    let sign: string
    let tag: SemanticVersion
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        sign: sign = faker.string.nanoid(),
        tag: tag = '3.0.0-alpha.1',
        tagprefix: gc.tagprefix
      })
    })

    it('should set #force', () => {
      expect(subject).to.have.property('force', false)
    })

    it('should set #message', () => {
      expect(subject).to.have.property('message', '')
    })

    it('should set #object', () => {
      expect(subject).to.have.property('object', 'HEAD')
    })

    it('should set #push', () => {
      expect(subject).to.have.property('push', false)
    })

    it('should set #remote', () => {
      expect(subject).to.have.property('remote', 'origin')
    })

    it('should set #sign', () => {
      expect(subject).to.have.property('sign', sign)
    })

    it('should set #tag', () => {
      expect(subject).to.have.property('tag', gc.tagprefix + tag)
    })

    it('should set #verify', () => {
      expect(subject).to.have.property('verify', !!sign)
    })
  })
})
