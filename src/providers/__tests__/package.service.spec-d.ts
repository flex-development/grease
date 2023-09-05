/**
 * @file Type Tests - PackageService
 * @module grease/providers/tests/unit-d/PackageService
 */

import type { PackageScope } from '@flex-development/mlly'
import type { ReadonlyKeys } from '@flex-development/tutils'
import TestSubject from '../package.service'

describe('unit-d:providers/PackageService', () => {
  it('should match [readonly scope: Readonly<PackageScope>]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'scope'>().not.toBeNever()
    expectTypeOf<TestSubject>()
      .toHaveProperty('scope')
      .toEqualTypeOf<Readonly<PackageScope>>()
  })
})
