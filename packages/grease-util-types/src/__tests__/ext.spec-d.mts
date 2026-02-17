/**
 * @file Type Tests - Ext
 * @module grease-util-types/tests/unit-d/Ext
 */

import type TestSubject from '#lib/ext'

describe('unit-d:Ext', () => {
  it('should equal `.${string}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`.${string}`>()
  })
})
