/**
 * @file Type Tests - Author
 * @module grease/types/tests/unit-d/Author
 */

import type TestSubject from '../author'

describe('unit-d:types/Author', () => {
  it('should match [email: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('email').toEqualTypeOf<string>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
