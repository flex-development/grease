/**
 * @file Type Tests - Version
 * @module grease/models/tests/unit-d/Version
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import type { SemVer } from 'semver'
import type TestSubject from '../version.model'

describe('unit-d:models/Version', () => {
  it('should extend SemVer', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<SemVer>()
  })

  it('should match [version: SemanticVersion]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('version')
      .toEqualTypeOf<SemanticVersion>()
  })
})
