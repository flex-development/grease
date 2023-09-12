/**
 * @file Type Tests - ValidatorOptions
 * @module grease/types/tests/unit-d/ValidatorOptions
 */

import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../validator-options'

describe('unit-d:types/ValidatorOptions', () => {
  it('should match [debug?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('debug')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [target?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('target')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [value?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('value')
      .toEqualTypeOf<Optional<boolean>>()
  })
})
