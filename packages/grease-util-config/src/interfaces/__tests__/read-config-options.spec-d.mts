/**
 * @file Type Tests - ReadConfigOptions
 * @module grease-util-config/interfaces/tests/unit-d/ReadConfigOptions
 */

import type {
  Skip,
  default as TestSubject
} from '#interfaces/read-config-options'
import type { List } from '@flex-development/grease-util-types'
import type {
  ModuleId,
  ResolveModuleOptions
} from '@flex-development/mlly'
import type { Nilable, RequiredKeys } from '@flex-development/tutils'

describe('unit-d:interfaces/ReadConfigOptions', () => {
  it('should extend Omit<ResolveModuleOptions, Skip>', () => {
    // Arrange
    type Expect = Omit<ResolveModuleOptions, Skip>

    // Expect
    expectTypeOf<TestSubject>().toExtend<Expect>()
  })

  it('should have no required keys', () => {
    expectTypeOf<RequiredKeys<TestSubject>>().toEqualTypeOf<never>()
  })

  it('should match [conditions?: List<string> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('conditions')
      .toEqualTypeOf<Nilable<List<string>>>()
  })

  it('should match [cwd?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('cwd')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [importAttributes?: ImportAttributes | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('importAttributes')
      .toEqualTypeOf<Nilable<ImportAttributes>>()
  })

  it('should match [mainFields?: List<string> | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mainFields')
      .toEqualTypeOf<Nilable<List<string>>>()
  })

  it('should match [parent?: ModuleId | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('parent')
      .toEqualTypeOf<Nilable<ModuleId>>()
  })

  it('should match [req?: RequestInit | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('req')
      .toEqualTypeOf<Nilable<RequestInit>>()
  })
})
