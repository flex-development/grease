/**
 * @file Type Tests - Trailer
 * @module grease/types/tests/unit-d/Trailer
 */

import type TestSubject from '../trailer'

describe('unit-d:types/Trailer', () => {
  it('should match [token: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('token').toEqualTypeOf<string>()
  })

  it('should match [value: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('value').toEqualTypeOf<string>()
  })
})
