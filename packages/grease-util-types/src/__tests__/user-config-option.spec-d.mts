/**
 * @file Type Tests - UserConfigOption
 * @module grease-util-types/tests/unit-d/UserConfigOption
 */

import type TestSubject from '#lib/user-config-option'
import type {
  GetUserConfig,
  UserConfig
} from '@flex-development/grease-util-types'

describe('unit-d:UserConfigOption', () => {
  it('should allow GetUserConfig<PromiseLike<UserConfig>>', () => {
    // Arrange
    type Target = GetUserConfig<PromiseLike<UserConfig>>

    // Expect
    expectTypeOf<Target>().toExtend<TestSubject>()
  })

  it('should allow GetUserConfig<UserConfig>', () => {
    expectTypeOf<GetUserConfig<UserConfig>>().toExtend<TestSubject>()
  })

  it('should extract GetUserConfig', () => {
    expectTypeOf<TestSubject>().extract<GetUserConfig>().not.toBeNever()
  })

  it('should extract UserConfig', () => {
    expectTypeOf<TestSubject>().extract<UserConfig>().not.toBeNever()
  })
})
