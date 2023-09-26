/**
 * @file Unit Tests - GlobalOptions
 * @module grease/options/tests/unit/GlobalOptions
 */

import pathe from '@flex-development/pathe'
import { DOT } from '@flex-development/tutils'
import TestSubject from '../global.options'

describe('unit:options/GlobalOptions', () => {
  describe('constructor', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should set #colors', () => {
      expect(subject).to.have.property('colors', true)
    })

    it('should set #cwd', () => {
      expect(subject).to.have.property('cwd', pathe.resolve(DOT))
    })

    it('should set #debug', () => {
      expect(subject).to.have.property('debug', false)
    })

    it('should set #silent', () => {
      expect(subject).to.have.property('silent', false)
    })

    it('should set #tagprefix', () => {
      expect(subject).to.have.property('tagprefix', '')
    })
  })
})
