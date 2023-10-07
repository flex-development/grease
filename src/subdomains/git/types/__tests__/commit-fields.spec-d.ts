/**
 * @file Type Tests - CommitFields
 * @module grease/git/types/tests/unit-d/CommitFields
 */

import type { Construct } from '@flex-development/tutils'
import type TestSubject from '../commit-fields'
import type CommitLogField from '../commit-log-field'

describe('unit-d:git/types/CommitFields', () => {
  it('should extend Construct<Record<CommitLogField, string>>', () => {
    expectTypeOf<TestSubject>()
      .toMatchTypeOf<Construct<Record<CommitLogField, string>>>()
  })

  it('should match [breaking: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaking')
      .toEqualTypeOf<string>()
  })

  it('should match [scope: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('scope').toEqualTypeOf<string>()
  })

  it('should match [subject: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('subject')
      .toEqualTypeOf<string>()
  })

  it('should match [type: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('type').toEqualTypeOf<string>()
  })
})
