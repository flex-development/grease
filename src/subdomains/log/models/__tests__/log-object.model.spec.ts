/**
 * @file Unit Tests - LogObject
 * @module grease/log/models/tests/unit/LogObject
 */

import { LogLevel, LogType } from '#src/log/enums'
import type { InputLog } from '#src/log/interfaces'
import {
  fallback,
  get,
  isNull,
  type Nullable,
  type Omit
} from '@flex-development/tutils'
import TestSubject from '../log-object.model'

describe('unit:log/models/LogObject', () => {
  let tag: string

  beforeAll(() => {
    tag = 'grease'
  })

  describe('constructor', () => {
    describe.each<[keyof typeof LogType, Omit<InputLog, 'type'>]>([
      ['DEBUG', { args: [0], message: 'constructor test %d', tag }],
      ['ERROR', { args: [1], message: new Error('constructor test %d err') }],
      ['FAIL', { args: [2], message: new Error('constructor test %d err') }],
      ['FATAL', { args: [3], message: new Error('constructor test %d err') }],
      ['INFO', { args: [4], message: 'constructor test %d', tag }],
      ['LOG', { args: [5], message: 'constructor test %d' }],
      ['START', { args: [6], message: 'constructor test %d' }],
      ['SUCCESS', { args: [7], message: 'constructor test %d' }],
      ['TRACE', { args: [8], message: 'constructor test %d', tag }],
      ['VERBOSE', { args: [9], message: 'constructor test %d' }],
      ['WARN', { args: [10], message: 'constructor test %d' }]
    ])('LogType.%s', (key, input) => {
      let subject: TestSubject

      beforeAll(() => {
        subject = new TestSubject({ ...input, type: LogType[key] })
      })

      it('should set #args', () => {
        expect(subject).to.have.deep.property('args', input.args)
      })

      it('should set #error', () => {
        expect(subject)
          .to.have.property('error')
          .satisfy((v: Nullable<Error>) => isNull(v) || v instanceof Error)
      })

      it('should set #message', () => {
        // Arrange
        const message: unknown = get(input.message, 'message', input.message)

        // Expect
        expect(subject).to.have.property('message', message)
      })

      it('should set #tag', () => {
        expect(subject).to.have.property('tag', fallback(input.tag, ''))
      })

      it('should set #type', () => {
        expect(subject).to.have.property('type', LogType[key])
      })
    })
  })

  describe('.level', () => {
    describe.each<[keyof typeof LogType, LogLevel?]>([
      ['DEBUG'],
      ['ERROR'],
      ['FAIL', LogLevel.ERROR],
      ['FATAL'],
      ['INFO'],
      ['LOG'],
      ['START', LogLevel.INFO],
      ['SUCCESS', LogLevel.INFO],
      ['TRACE'],
      ['VERBOSE'],
      ['WARN']
    ])('LogType.%s', (key, level = get(LogLevel, key)) => {
      it('should return log level', () => {
        expect(TestSubject.level(LogType[key])).to.equal(level)
      })
    })
  })
})
