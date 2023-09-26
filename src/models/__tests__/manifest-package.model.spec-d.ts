/**
 * @file Type Tests - PackageManifest
 * @module grease/models/tests/unit-d/PackageManifest
 */

import type { PackageJson } from '@flex-development/pkg-types'
import type { ReadonlyKeys } from '@flex-development/tutils'
import type TestSubject from '../manifest-package.model'
import AbstractManifest from '../manifest.abstract'

describe('unit-d:models/PackageManifest', () => {
  it('should extend AbstractManifest', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<AbstractManifest>()
  })

  it('should match [readonly pkg: PackageJson]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'pkg'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('pkg')
      .toEqualTypeOf<PackageJson>()
  })
})
