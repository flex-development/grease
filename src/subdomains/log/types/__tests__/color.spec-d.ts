/**
 * @file Type Tests - Color
 * @module grease/log/types/tests/unit-d/Colors
 */

import type TestSubject from '../color'
import type Colors from '../colors'

describe('unit-d:log/types/Color', () => {
  it('should equal Exclude<keyof Colors, "enabled">', () => {
    expectTypeOf<TestSubject>()
      .toEqualTypeOf<Exclude<keyof Colors, 'enabled'>>()
  })
})
