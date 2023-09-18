/**
 * @file Type Tests - BumpOptions
 * @module grease/options/tests/unit-d/BumpOptions
 */

import type { ReleaseVersion } from '#src/types'
import type { ModuleId } from '@flex-development/mlly'
import type TestSubject from '../bump.options'

describe('unit-d:options/BumpOptions', () => {
  it('should match [manifest: ModuleId]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('manifest')
      .toEqualTypeOf<ModuleId>()
  })

  it('should match [preid: string', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('preid')
      .toEqualTypeOf<string>()
  })

  it('should match [prestart: 0 | 1]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('prestart')
      .toEqualTypeOf<0 | 1>()
  })

  it('should match [release: ReleaseVersion]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('release')
      .toEqualTypeOf<ReleaseVersion>()
  })

  it('should match [silent: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('silent')
      .toEqualTypeOf<boolean>()
  })

  it('should match [write: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('write')
      .toEqualTypeOf<boolean>()
  })
})
