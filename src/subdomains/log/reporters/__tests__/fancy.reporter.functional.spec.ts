/**
 * @file Functional Tests - FancyReporter
 * @module grease/log/reporters/tests/functional/FancyReporter
 */

import gc from '#gc' assert { type: 'json' }
import { LogLevel, LogType } from '#src/log/enums'
import type { InputLog } from '#src/log/interfaces'
import { LogObject } from '#src/log/models'
import { LoggerOptions } from '#src/log/options'
import { LoggerService } from '#src/log/providers'
import type { Mock } from '#tests/interfaces'
import pathe from '@flex-development/pathe'
import { ifelse, isFalsy } from '@flex-development/tutils'
import TestSubject from '../fancy.reporter'

describe('functional:log/reporters/FancyReporter', () => {
  let logger: LoggerService
  let subject: TestSubject

  beforeAll(() => {
    logger = new LoggerService(new LoggerOptions()).withTag('grease')
    subject = new TestSubject(logger)
  })

  describe('#write', () => {
    describe.each<[type: keyof typeof LogType, input: Omit<InputLog, 'type'>]>([
      ['DEBUG', {
        args: ['.yml'],
        message: 'invalid extension',
        tag: 'grease:config'
      }],
      ['ERROR', {
        message: new TypeError('Invalid Version: 3.0'),
        tag: 'grease:bump'
      }],
      ['FAIL', {
        message: new TypeError('Could not resolve "logger"'),
        tag: 'grease:config'
      }],
      ['FATAL', {
        message: new Error('not a git repository'),
        tag: 'grease:git'
      }],
      ['INFO', {
        message: 'using git version 2.39.0 (/usr/local/bin/git)',
        tag: 'grease:git'
      }],
      ['LOG', { message: 'log message' }],
      ['START', {
        message: 'verifying gpg signature',
        tag: 'grease:tag'
      }],
      ['SUCCESS', {
        message: new LogObject<string>({
          message:
            `object 067c93cc68575a652d8609585bd64478c38dccfe\ntype commit\ntag ${gc.tagprefix}3.0.0-dev.1\ntagger Lexus Drumgold <unicornware@flexdevelopment.llc> 1696978824 -0400\n\nrelease: ${gc.tagprefix}3.0.0-dev.1`,
          tag: 'grease:tag',
          type: LogType.SUCCESS
        })
      }],
      ['TRACE', {
        args: ['067c93cc68575a652d8609585bd64478c38dccfe'],
        message: 'cannot describe \'%s\'',
        tag: 'grease:git'
      }],
      ['VERBOSE', {
        args: [pathe.sep],
        message: 'Read 19 entries for directory "%s"',
        tag: 'grease:config'
      }],
      ['WARN', {
        message:
          'This assignment will throw because "foo" is a constant [assign-to-constant]',
        tag: 'grease:config'
      }]
    ])('LogType.%s', (type, input) => {
      let spacer: string
      let log: LogObject
      let write: Mock<typeof process[typeof writer]['write']>
      let writer: `std${'err' | 'out'}`

      beforeAll(() => {
        log = new LogObject({ ...input, type })
        spacer = /error|fail|fatal/.test(log.type) ? '' : '\n'
        write = vi.fn(data => !isFalsy(data))
        writer = ifelse(log.level < LogLevel.LOG, 'stderr', 'stdout')
      })

      beforeEach(() => {
        vi.spyOn(process[writer], 'write').mockImplementationOnce(write)
        subject.write(log)
      })

      it('should write log', () => {
        expect(write).toHaveBeenCalledOnce()
        expect(write).toHaveBeenCalledWith(expect.any(String))
        expect(spacer + <string>write.mock.lastCall?.[0]).toMatchSnapshot()
      })
    })
  })
})
