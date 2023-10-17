/**
 * @file Type Tests - UserLogLevel
 * @module grease/log/enums/tests/unit-d/UserLogLevel
 */

import type TestSubject from '../log-level-user'

describe('unit-d:log/enums/UserLogLevel', () => {
  it('should match [DEBUG: "debug"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('DEBUG')
      .toMatchTypeOf<'debug'>()
  })

  it('should match [ERROR: "error"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ERROR')
      .toMatchTypeOf<'error'>()
  })

  it('should match [FATAL: "fatal"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('FATAL')
      .toMatchTypeOf<'fatal'>()
  })

  it('should match [INFO: "info"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('INFO')
      .toMatchTypeOf<'info'>()
  })

  it('should match [LOG: "log"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LOG')
      .toMatchTypeOf<'log'>()
  })

  it('should match [SILENT: "silent"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('SILENT')
      .toMatchTypeOf<'silent'>()
  })

  it('should match [TRACE: "trace"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TRACE')
      .toMatchTypeOf<'trace'>()
  })

  it('should match [VERBOSE: "verbose"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('VERBOSE')
      .toMatchTypeOf<'verbose'>()
  })

  it('should match [WARN: "warn"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('WARN')
      .toMatchTypeOf<'warn'>()
  })
})
