/**
 * @file Type Tests - LogObject
 * @module grease/log/models/tests/unit-d/LogObject
 */

import type { LogLevel, LogType } from '#src/log/enums'
import type { InputLog } from '#src/log/interfaces'
import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../log-object.model'

describe('unit-d:log/models/LogObject', () => {
  it('should implement InputLog<T>', () => {
    expectTypeOf<TestSubject<string>>().toMatchTypeOf<InputLog<string>>()
  })

  it('should match [args: unknown[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('args')
      .toEqualTypeOf<unknown[]>()
  })

  it('should match [error: Nullable<Error>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('error')
      .toEqualTypeOf<Nullable<Error>>()
  })

  it('should match [level: LogLevel]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('level')
      .toEqualTypeOf<LogLevel>()
  })

  it('should match [tag: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tag')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [type: LogType]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('type').toEqualTypeOf<LogType>()
  })
})
