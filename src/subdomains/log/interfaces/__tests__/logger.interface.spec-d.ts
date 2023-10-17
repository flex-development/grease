/**
 * @file Type Tests - ILogger
 * @module grease/log/interfaces/tests/unit-d/ILogger
 */

import type { LogLevel } from '#src/log/enums'
import type { LoggerOptions } from '#src/log/options'
import type { Colors } from '#src/log/types'
import type { Fn } from '@flex-development/tutils'
import type TestSubject from '../logger.interface'

describe('unit-d:log/interfaces/ILogger', () => {
  it('should match [colors: Colors', () => {
    expectTypeOf<TestSubject>().toHaveProperty('colors').toEqualTypeOf<Colors>()
  })

  it('should match [debug(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('debug')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [error(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('error')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [fail(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fail')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [fatal(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('fatal')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [info(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('info')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [level: LogLevel]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('level')
      .toEqualTypeOf<LogLevel>()
  })

  it('should match [log(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('log')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [options: LoggerOptions]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('options')
      .toEqualTypeOf<LoggerOptions>()
  })

  it('should match [start(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('start')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [success(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('success')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [trace(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('trace')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [verbose(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('verbose')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [warn(message: unknown, ...args: any[]): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('warn')
      .toMatchTypeOf<Fn<[unknown, ...any[]], void>>()
  })

  it('should match [withTag(tag: string): ILogger]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('withTag')
      .toMatchTypeOf<Fn<[string], TestSubject>>()
  })
})
