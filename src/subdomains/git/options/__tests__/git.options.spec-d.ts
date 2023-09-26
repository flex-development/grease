/**
 * @file Type Tests - GitOptions
 * @module grease/git/options/tests/unit-d/GitOptions
 */

import type { GlobalOptions } from '#src/options'
import type TestSubject from '../git.options'

describe('unit-d:git/options/GitOptions', () => {
  it('should extend GlobalOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GlobalOptions>()
  })
})
