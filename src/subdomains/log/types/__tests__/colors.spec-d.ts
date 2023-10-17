/**
 * @file Type Tests - Colors
 * @module grease/log/types/tests/unit-d/Colors
 */

import type { Omit } from '@flex-development/tutils'
import type * as tinyrainbow from 'tinyrainbow'
import type TestSubject from '../colors'

describe('unit-d:log/types/Colors', () => {
  it('should extend Omit<tinyrainbow.Colors, "isColorSupported">', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<Omit<tinyrainbow.Colors, 'isColorSupported'>>()
  })

  it('should match [color: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('color').toEqualTypeOf<boolean>()
  })
})
