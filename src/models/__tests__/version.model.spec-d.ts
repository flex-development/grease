/**
 * @file Type Tests - Version
 * @module grease/models/tests/unit-d/Version
 */

import type { IVersion } from '#src/interfaces'
import type { SemVer } from 'semver'
import type TestSubject from '../version.model'

describe('unit-d:models/Version', () => {
  it('should extend SemVer', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<SemVer>()
  })

  it('should implement IVersion', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IVersion>()
  })
})
