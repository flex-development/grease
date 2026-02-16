/**
 * @file Type Tests - GetUserConfig
 * @module grease-util-types/tests/unit-d/GetUserConfig
 */

import type TestSubject from '#lib/get-user-config'
import type { Awaitable, UserConfig } from '@flex-development/grease-util-types'

describe('unit-d:GetUserConfig', () => {
  type T = Awaitable<UserConfig> | Promise<UserConfig> | UserConfig
  type Subject = TestSubject<T>

  it('should match [this: void]', () => {
    expectTypeOf<Subject>().thisParameter.toEqualTypeOf<void>()
  })

  describe('parameters', () => {
    it('should be callable with []', () => {
      expectTypeOf<Subject>().parameters.toEqualTypeOf<[]>()
    })
  })

  describe('returns', () => {
    it('should return T', () => {
      expectTypeOf<Subject>().returns.toEqualTypeOf<T>()
    })
  })
})
