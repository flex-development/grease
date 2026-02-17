/**
 * @file Type Tests - ResolvedUserConfig
 * @module grease-util-types/tests/unit-d/ResolvedUserConfig
 */

import type TestSubject from '#lib/resolved-user-config'
import type { UserConfigOption } from '@flex-development/grease-util-types'

describe('unit-d:ResolvedUserConfig', () => {
  it('should match [config: UserConfigOption]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('config')
      .toEqualTypeOf<UserConfigOption>()
  })

  it('should match [url: URL]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('url').toEqualTypeOf<URL>()
  })
})
