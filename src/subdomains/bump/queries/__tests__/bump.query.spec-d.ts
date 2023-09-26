/**
 * @file Type Tests - BumpQuery
 * @module grease/bump/models/tests/unit-d/BumpQuery
 */

import type { GitOptions } from '#src/git'
import type TestSubject from '../bump.query'

describe('unit-d:bump/models/BumpQuery', () => {
  it('should extend GitOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitOptions>()
  })

  it('should match [to: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('to').toEqualTypeOf<string>()
  })
})
