/**
 * @file Type Tests - GlobalOptions
 * @module grease/options/tests/unit-d/GlobalOptions
 */

import type TestSubject from '../global.options'

describe('unit-d:options/GlobalOptions', () => {
  it('should match [colors: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('colors')
      .toEqualTypeOf<boolean>()
  })

  it('should match [config: boolean | string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('config')
      .toEqualTypeOf<boolean | string>()
  })

  it('should match [cwd: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('cwd').toEqualTypeOf<string>()
  })

  it('should match [debug: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('debug').toEqualTypeOf<boolean>()
  })

  it('should match [quiet: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('quiet')
      .toEqualTypeOf<boolean>()
  })

  it('should match [tagprefix: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tagprefix')
      .toEqualTypeOf<string>()
  })

  it('should match [unstable: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('unstable')
      .toEqualTypeOf<boolean>()
  })
})
