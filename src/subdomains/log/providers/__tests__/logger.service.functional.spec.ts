/**
 * @file Functional Tests - LoggerService
 * @module grease/log/providers/tests/functional/LoggerService
 */

import { LogLevel, LogType } from '#src/log/enums'
import { LogObject } from '#src/log/models'
import { LoggerOptions } from '#src/log/options'
import { FancyReporter } from '#src/log/reporters'
import type { Mock } from '#tests/interfaces'
import {
  constant,
  define,
  join,
  sift,
  type EmptyString
} from '@flex-development/tutils'
import TestSubject from '../logger.service'

describe('functional:log/providers/LoggerService', () => {
  let subject: TestSubject

  beforeAll(() => {
    subject = new TestSubject(new LoggerOptions({
      level: LogLevel.VERBOSE,
      tag: 'grease'
    }))
  })

  describe.each<[LogType, (EmptyString | 'level')?]>([
    [LogType.DEBUG, 'level'],
    [LogType.ERROR, 'level'],
    [LogType.FAIL],
    [LogType.FATAL, 'level'],
    [LogType.INFO, 'level'],
    [LogType.LOG, 'level'],
    [LogType.START],
    [LogType.SUCCESS],
    [LogType.TRACE, 'level'],
    [LogType.VERBOSE, 'level'],
    [LogType.WARN, 'level']
  ])('#%s', (type, level = '') => {
    let write: Mock<FancyReporter['write']>

    beforeAll(() => {
      write = vi.fn().mockName('FancyReporter.prototype.write')
    })

    beforeEach(() => {
      vi.spyOn(FancyReporter.prototype, 'write').mockImplementationOnce(write)
    })

    it('should not write log if level is not enabled', ctx => {
      // Arrange
      define(subject, 'level', { get: constant(LogLevel.SILENT) })

      // Act
      subject[type](ctx.task.name)

      // Expect
      expect(write).not.toHaveBeenCalled()

      // Cleanup
      define(subject, 'level', { get: constant(subject.options.level) })
    })

    it(`should write ${join(sift([type, level]), ' ')} log`, ctx => {
      // Act
      subject[type](new LogObject({ message: ctx.task.name }))

      // Expect
      expect(write).toHaveBeenCalledOnce()
      expect(write).toHaveBeenCalledWith(expect.any(LogObject))
    })
  })
})
