/**
 * @file Type Tests - LogLevel
 * @module grease/enums/tests/unit-d/LogLevel
 */

import type TestSubject from '../log-level'

describe('unit-d:enums/LogLevel', () => {
  it('should match [DEBUG: 4]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('DEBUG')
      .toEqualTypeOf<4>()
  })

  it('should match [ERROR: 0]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('ERROR')
      .toEqualTypeOf<0>()
  })

  it('should match [FATAL: 0]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('FATAL')
      .toEqualTypeOf<0>()
  })

  it('should match [INFO: 3]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('INFO')
      .toEqualTypeOf<3>()
  })

  it('should match [LOG: 2]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('LOG')
      .toEqualTypeOf<2>()
  })

  it('should match [SILENT: typeof Number.NEGATIVE_INFINITY]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('SILENT')
      .toEqualTypeOf<number>()
  })

  it('should match [TRACE: 5]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('TRACE')
      .toEqualTypeOf<5>()
  })

  it('should match [VERBOSE: typeof Number.POSITIVE_INFINITY]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('VERBOSE')
      .toEqualTypeOf<number>()
  })

  it('should match [WARN: 1]', () => {
    expectTypeOf<typeof TestSubject>()
      .toHaveProperty('WARN')
      .toEqualTypeOf<1>()
  })
})
