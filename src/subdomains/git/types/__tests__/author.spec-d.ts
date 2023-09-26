/**
 * @file Type Tests - Author
 * @module grease/git/types/tests/unit-d/Author
 */

import type TestSubject from '../author'

describe('unit-d:git/types/Author', () => {
  it('should match [email: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('email').toEqualTypeOf<string>()
  })

  it('should match [name: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('name').toEqualTypeOf<string>()
  })
})
