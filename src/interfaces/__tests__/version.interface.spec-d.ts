/**
 * @file Type Tests - IVersion
 * @module grease/interfaces/tests/unit-d/IVersion
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import type { NumberString } from '@flex-development/tutils'
import type TestSubject from '../version.interface'

describe('unit-d:interfaces/IVersion', () => {
  it('should match [build: readonly string[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('build')
      .toEqualTypeOf<readonly string[]>()
  })

  it('should match [major: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('major').toEqualTypeOf<number>()
  })

  it('should match [minor: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('minor').toEqualTypeOf<number>()
  })

  it('should match [patch: number]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('patch').toEqualTypeOf<number>()
  })

  it('should match [prerelease: readonly NumberString[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('prerelease')
      .toEqualTypeOf<readonly NumberString[]>()
  })

  it('should match [version: SemanticVersion]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<SemanticVersion>()
  })
})
