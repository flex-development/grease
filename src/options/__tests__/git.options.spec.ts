/**
 * @file Unit Tests - GitOptions
 * @module grease/options/tests/unit/GitOptions
 */

import pathe from '@flex-development/pathe'
import TestSubject from '../git.options'

describe('unit:options/GitOptions', () => {
  describe('constructor', () => {
    let cwd: TestSubject['cwd']
    let debug: TestSubject['debug']
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject({
        cwd: (cwd = pathe.resolve('__fixtures__/pkg/major')),
        debug: (debug = true)
      })
    })

    it('should set #cwd', () => {
      expect(subject).to.have.property('cwd', cwd)
    })

    it('should set #debug', () => {
      expect(subject).to.have.property('debug', debug)
    })
  })
})
