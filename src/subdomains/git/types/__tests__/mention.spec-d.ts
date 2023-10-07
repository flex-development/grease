/**
 * @file Type Tests - Mention
 * @module grease/git/types/tests/unit-d/Mention
 */

import type TestSubject from '../mention'

describe('unit-d:git/types/Mention', () => {
  it('should equal `@${string}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`@${string}`>()
  })
})
