/**
 * @file Type Tests - InputLog
 * @module grease/log/interfaces/tests/unit-d/InputLog
 */

import type { LogLevel, LogType } from '#src/log/enums'
import type { Nilable, Optional } from '@flex-development/tutils'
import type TestSubject from '../input-log.interface'

describe('unit-d:log/interfaces/InputLog', () => {
  it('should match [args?: readonly any[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('args')
      .toEqualTypeOf<Optional<readonly any[]>>()
  })

  it('should match [level?: LogLevel]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('level')
      .toEqualTypeOf<Optional<LogLevel>>()
  })

  it('should match [message: T]', () => {
    expectTypeOf<TestSubject<string>>()
      .toHaveProperty('message')
      .toEqualTypeOf<string>()
  })

  it('should match [tag?: Nilable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tag')
      .toEqualTypeOf<Nilable<string>>()
  })

  it('should match [type?: LogType | keyof typeof LogType]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('type')
      .toEqualTypeOf<Optional<LogType | keyof typeof LogType>>()
  })
})
