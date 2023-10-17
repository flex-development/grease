/**
 * @file Unit Tests - LoggerOptions
 * @module grease/log/options/tests/unit/LoggerOptions
 */

import { LogLevel } from '#src/log/enums'
import { FancyReporter } from '#src/log/reporters'
import TestSubject from '../logger.options'

describe('unit:log/options/LoggerOptions', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('constructor', () => {
    it('should set #color', () => {
      expect(subject).to.have.property('color', true)
    })

    it('should set #level', () => {
      expect(subject).to.have.property('level', LogLevel.LOG)
    })

    it('should set #reporters', () => {
      expect(subject).to.have.deep.property('reporters', [FancyReporter])
    })

    it('should set #tag', () => {
      expect(subject).to.have.property('tag', '')
    })
  })
})
