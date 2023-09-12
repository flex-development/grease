/**
 * @file Type Tests - GitOptions
 * @module grease/options/tests/unit-d/GitOptions
 */

import TestSubject from '../git.options'

describe('unit-d:options/GitOptions', () => {
  it('should match [cwd: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('cwd').toEqualTypeOf<string>()
  })

  it('should match [debug: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('debug').toEqualTypeOf<boolean>()
  })
})
