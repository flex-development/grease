/**
 * @file Type Tests - UserConfig
 * @module grease-util-types/tests/unit-d/UserConfig
 */

import type TestSubject from '#lib/user-config'
import type { RequiredKeys } from '@flex-development/tutils'

describe('unit-d:UserConfig', () => {
  it('should have no required keys', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toEqualTypeOf<never>()
  })
})
