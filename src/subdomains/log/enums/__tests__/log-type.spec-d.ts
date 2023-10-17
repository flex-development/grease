/**
 * @file Type Tests - LogType
 * @module grease/log/enums/tests/unit-d/LogType
 */

import type TestSubject from '../log-type'

describe('unit-d:log/enums/LogType', () => {
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

  it('should match [FAIL: "fail"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('FAIL')
      .toMatchTypeOf<'fail'>()
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

  it('should match [START: "start"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('START')
      .toMatchTypeOf<'start'>()
  })

  it('should match [SUCCESS: "success"]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('SUCCESS')
      .toMatchTypeOf<'success'>()
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
