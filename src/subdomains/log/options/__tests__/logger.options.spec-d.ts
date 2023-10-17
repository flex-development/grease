/**
 * @file Type Tests - LoggerOptions
 * @module grease/log/options/tests/unit-d/LoggerOptions
 */

import type { LogLevel } from '#src/log/enums'
import type { ILogger } from '#src/log/interfaces'
import type { Reporter } from '#src/log/reporters'
import type { Constructor } from '@flex-development/tutils'
import type TestSubject from '../logger.options'

describe('unit-d:log/options/LoggerOptions', () => {
  it('should match [color: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<boolean>()
  })

  it('should match [level: LogLevel]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('level')
      .toEqualTypeOf<LogLevel>()
  })

  it('should match [reporters: Constructor<Reporter, [ILogger]>[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('reporters')
      .toEqualTypeOf<Constructor<Reporter, [ILogger]>[]>()
  })

  it('should match [tag: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('tag').toEqualTypeOf<string>()
  })
})
