/**
 * @file Type Tests - LogLevel
 * @module grease/log/enums/tests/unit-d/LogLevel
 */

import type TestSubject from '../log-level'

describe('unit-d:log/enums/LogLevel', () => {
  it('should match [DEBUG: 4]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('DEBUG')
      .toMatchTypeOf<4>()
  })

  it('should match [ERROR: 0]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ERROR')
      .toMatchTypeOf<0>()
  })

  it('should match [FATAL: -1]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('FATAL')
      .toMatchTypeOf<-1>()
  })

  it('should match [INFO: 3]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('INFO')
      .toMatchTypeOf<3>()
  })

  it('should match [LOG: 2]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LOG')
      .toMatchTypeOf<2>()
  })

  it('should match [SILENT: typeof Number.NEGATIVE_INFINITY]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('SILENT')
      .toMatchTypeOf<number>()
  })

  it('should match [TRACE: 5]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TRACE')
      .toMatchTypeOf<5>()
  })

  it('should match [VERBOSE: typeof Number.POSITIVE_INFINITY]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('VERBOSE')
      .toMatchTypeOf<number>()
  })

  it('should match [WARN: 1]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('WARN')
      .toMatchTypeOf<1>()
  })
})
