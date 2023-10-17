/**
 * @file Type Tests - GlobalOptions
 * @module grease/options/tests/unit-d/GlobalOptions
 */

import type { UserLogLevel } from '#src/log'
import type { OrLowercase } from '@flex-development/tutils'
import type TestSubject from '../global.options'

describe('unit-d:options/GlobalOptions', () => {
  it('should match [color: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<boolean>()
  })

  it('should match [config: boolean | string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('config')
      .toEqualTypeOf<boolean | string>()
  })

  it('should match [cwd: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('cwd').toEqualTypeOf<string>()
  })

  it('should match [level: OrLowercase<UserLogLevel>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('level')
      .toEqualTypeOf<OrLowercase<UserLogLevel>>()
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
