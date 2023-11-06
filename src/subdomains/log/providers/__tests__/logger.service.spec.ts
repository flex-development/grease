/**
 * @file Unit Tests - LoggerService
 * @module grease/log/providers/tests/unit/LoggerService
 */

import { LogLevel, UserLogLevel } from '#src/log/enums'
import { LoggerOptions } from '#src/log/options'
import { FancyReporter } from '#src/log/reporters'
import pathe from '@flex-development/pathe'
import { cast, uppercase } from '@flex-development/tutils'
import TestSubject from '../logger.service'

describe('unit:log/providers/LoggerService', () => {
  let options: LoggerOptions
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject(options = new LoggerOptions({ tag: 'grease' }))
  })

  describe('#colors', () => {
    afterAll(() => {
      vi.unstubAllEnvs()
    })

    beforeEach(() => {
      vi.stubEnv('FORCE_COLOR', 'false')
      vi.stubEnv('GITHUB_ACTIONS', 'true')
      vi.stubEnv('NO_COLOR', 'true')
    })

    it('should return color functions map', () => {
      expect(subject.colors).toMatchSnapshot()
    })
  })

  describe('#level', () => {
    describe('get', () => {
      it('should return log level', () => {
        expect(subject).to.have.property('level', LogLevel.LOG)
      })
    })

    describe('set', () => {
      describe.each<[keyof typeof LogLevel]>([
        ['DEBUG'],
        ['ERROR'],
        ['FATAL'],
        ['INFO'],
        ['INFO'],
        ['SILENT'],
        ['TRACE'],
        ['VERBOSE'],
        ['WARN']
      ])('LogLevel.%s', key => {
        let level: LogLevel
        let subject: TestSubject

        beforeAll(() => {
          level = LogLevel[key]
          subject = new TestSubject(new LoggerOptions({ level: cast(-3)! }))
        })

        it('should set log level given LogLevel', () => {
          // Act
          subject.level = level

          // Act + Expect
          expect(subject).to.have.nested.property('options.level', level)
        })

        it('should set log level given UserLogLevel', () => {
          // Act
          subject.level = UserLogLevel[key]

          // Act + Expect
          expect(subject).to.have.nested.property('options.level', level)
        })
      })
    })
  })

  describe('#reporters', () => {
    it('should return reporters array', () => {
      expect(subject)
        .to.have.deep.property('reporters', [new FancyReporter(subject)])
    })
  })

  describe('#setLogLevels', () => {
    it('should return this log level', () => {
      // Arrange
      const cases: [keyof typeof LogLevel, UserLogLevel[]][] = [
        ['LOG', []],
        ['WARN', [UserLogLevel.ERROR, UserLogLevel.FATAL, UserLogLevel.WARN]]
      ]

      // Act + Expect
      cases.forEach(([key, levels]) => {
        expect(new TestSubject().setLogLevels(levels)).to.equal(LogLevel[key])
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
      const color: boolean = false
      const level: UserLogLevel = UserLogLevel.DEBUG

      // Act
      const result = subject.sync({ color, level })

      // Expect
      expect(result).to.equal(subject)
      expect(result).to.have.nested.property('options.color', color)
      expect(result).to.have.property('level', LogLevel[uppercase(level)])
    })
  })

  describe('#tag', () => {
    describe('get', () => {
      it('should return logger tag', () => {
        expect(subject).to.have.property('tag', options.tag)
      })
    })

    describe('set', () => {
      it('should set logger tag', () => {
        // Arrange
        const tag: string = options.tag + pathe.delimiter + 'bump'
        const subject: TestSubject = new TestSubject()

        // Act
        subject.tag = tag

        // Act + Expect
        expect(subject).to.have.property('tag', tag)
      })
    })
  })

  describe('#withTag', () => {
    it('should return tagged logger', () => {
      // Arrange
      const parent: string = options.tag
      const tag: string = 'git'

      // Act + Expect
      expect(subject.withTag(tag))
        .to.be.instanceof(TestSubject)
        .with.nested.property('options.tag', parent + pathe.delimiter + tag)
    })
  })
})
