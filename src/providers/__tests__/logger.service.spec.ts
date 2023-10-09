/**
 * @file Unit Tests - LoggerService
 * @module grease/providers/tests/unit/LoggerService
 */

import { LogLevel } from '#src/enums'
import type { GlobalOptions } from '#src/options'
import { cast, omit, set, type Partial } from '@flex-development/tutils'
import { colors } from 'consola/utils'
import TestSubject from '../logger.service'

describe('unit:providers/LoggerService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject()
  })

  describe('#color', () => {
    it('should return color functions map', () => {
      expect(subject).to.have.property('color', colors)
    })
  })

  describe('#colors', () => {
    let opt: string

    beforeAll(() => {
      opt = 'consola.options.formatOptions.colors'
    })

    describe('get', () => {
      it('should return false if colored output is not enabled', () => {
        // Arrange
        const subject: TestSubject = cast(set(new TestSubject(), opt, false))

        // Act + Expect
        expect(subject).to.have.property('colors').be.false
      })

      it('should return true if colored output is enabled', () => {
        expect(new TestSubject()).to.have.property('colors').be.true
      })
    })

    describe('set', () => {
      it('should disable colored output', () => {
        // Arrange
        const subject: TestSubject = new TestSubject()

        // Act
        subject.colors = false

        // Expect
        expect(subject).to.have.property('colors').be.false
      })

      it('should enable colored output', () => {
        // Arrange
        const subject: TestSubject = cast(set(new TestSubject(), opt, false))

        // Act
        subject.colors = true

        // Expect
        expect(subject).to.have.property('colors').be.true
      })
    })
  })

  describe('#dbg', () => {
    let opt: string

    beforeAll(() => {
      opt = 'consola.level'
    })

    describe('get', () => {
      it('should return false if logger is not in debug mode', () => {
        // Arrange
        const level: number = LogLevel.INFO
        const subject: TestSubject = cast(set(new TestSubject(), opt, level))

        // Act + Expect
        expect(subject).to.have.property('dbg').be.false
      })

      it('should return true if logger is in debug mode', () => {
        // Arrange
        const level: number = LogLevel.DEBUG
        const subject: TestSubject = cast(set(new TestSubject(), opt, level))

        // Act + Expect
        expect(subject).to.have.property('dbg').be.true
      })
    })

    describe('set', () => {
      it('should set log level to LogLevel.TRACE', () => {
        // Arrange
        const subject: TestSubject = new TestSubject()

        // Act
        subject.dbg = true

        // Expect
        expect(subject).to.have.property('level', LogLevel.TRACE)
      })

      it('should set log level to LogLevel.INFO', () => {
        // Arrange
        const level: number = LogLevel.DEBUG
        const subject: TestSubject = cast(set(new TestSubject(), opt, level))

        // Act
        subject.dbg = false

        // Expect
        expect(subject).to.have.property('level', LogLevel.INFO)
      })
    })
  })

  describe('#level', () => {
    describe('get', () => {
      it('should return log level', () => {
        expect(new TestSubject()).to.have.property('level', LogLevel.INFO)
      })
    })

    describe('set', () => {
      it('should set log level', () => {
        // Arrange
        const level: number = LogLevel.TRACE
        const subject: TestSubject = new TestSubject()

        // Act
        subject.level = level

        // Act + Expect
        expect(subject).to.have.property('level', level)
      })
    })
  })

  describe('#options', () => {
    it('should return logger options', () => {
      expect(omit(subject.options, ['stderr', 'stdout'])).toMatchSnapshot()
    })
  })

  describe('#silent', () => {
    let opt: string

    beforeAll(() => {
      opt = 'consola.level'
    })

    describe('get', () => {
      it('should return false if logger is not silent', () => {
        expect(new TestSubject()).to.have.property('silent').be.false
      })

      it('should return true if logger is silent', () => {
        // Arrange
        const level: number = LogLevel.SILENT
        const subject: TestSubject = cast(set(new TestSubject(), opt, level))

        // Act + Expect
        expect(subject).to.have.property('silent').be.true
      })
    })

    describe('set', () => {
      it('should set log level to LogLevel.INFO', () => {
        // Arrange
        const level: number = LogLevel.SILENT
        const subject: TestSubject = cast(set(new TestSubject(), opt, level))

        // Act
        subject.silent = false

        // Expect
        expect(subject).to.have.property('level', LogLevel.INFO)
      })

      it('should set log level to LogLevel.SILENT', () => {
        // Arrange
        const subject: TestSubject = new TestSubject()

        // Act
        subject.silent = true

        // Expect
        expect(subject).to.have.property('level', LogLevel.SILENT)
      })
    })
  })

  describe('#sync', () => {
    let subject: TestSubject

    beforeAll(() => {
      subject = new TestSubject()
    })

    it('should return this synced logger', () => {
      // Arrange
      const opts: Partial<GlobalOptions> = {
        colors: false,
        debug: true,
        quiet: true
      }

      // Act
      const result = subject.sync(opts)

      // Expect
      expect(result).to.equal(subject)
      expect(result).to.have.property('colors', opts.colors)
      expect(result).to.have.property('dbg', opts.debug)
      expect(result).to.have.property('silent', !opts.quiet)
    })
  })

  describe('#withTag', () => {
    it('should return tagged child logger', () => {
      // Arrange
      const tag: string = 'git'

      // Act
      const result = subject.withTag(tag)

      // Expect
      expect(result)
        .to.be.instanceof(TestSubject)
        .and.have.property('consola')
        .with.nested.property('options.defaults.tag', 'grease:' + tag)
    })
  })
})
