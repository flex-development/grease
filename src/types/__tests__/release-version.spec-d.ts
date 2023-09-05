/**
 * @file Type Tests - ReleaseVersion
 * @module grease/types/tests/unit-d/ReleaseVersion
 */

import type { ReleaseType } from '#src/enums'
import type { SemanticVersion } from '@flex-development/pkg-types'
import type semver from 'semver'
import type TestSubject from '../release-version'

describe('unit-d:types/ReleaseVersion', () => {
  it('should extract ReleaseType', () => {
    expectTypeOf<TestSubject>().extract<ReleaseType>().not.toBeNever()
  })

  it('should extract SemanticVersion', () => {
    expectTypeOf<TestSubject>().extract<SemanticVersion>().not.toBeNever()
  })

  it('should extract semver.ReleaseType', () => {
    expectTypeOf<TestSubject>().extract<semver.ReleaseType>().not.toBeNever()
  })
})
