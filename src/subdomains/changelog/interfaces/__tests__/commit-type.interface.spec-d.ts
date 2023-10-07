/**
 * @file Type Tests - ICommitType
 * @module grease/changelog/interfaces/tests/unit-d/ICommitType
 */

import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../commit-type.interface'

describe('unit-d:changelog/interfaces/ICommitType', () => {
  it('should match [hidden?: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('hidden')
      .toEqualTypeOf<Optional<boolean>>()
  })

  it('should match [section?: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('section')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [type: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('type').toEqualTypeOf<string>()
  })
})
