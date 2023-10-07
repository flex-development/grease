/**
 * @file Type Tests - ICommitGroup
 * @module grease/changelog/interfaces/tests/unit-d/ICommitGroup
 */

import type { ICommit } from '#src/git'
import type TestSubject from '../commit-group.interface'

describe('unit-d:changelog/interfaces/ICommitGroup', () => {
  it('should match [commits: T[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('commits')
      .toEqualTypeOf<ICommit[]>()
  })

  it('should match [hidden: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('hidden')
      .toEqualTypeOf<boolean>()
  })

  it('should match [key: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('key').toEqualTypeOf<string>()
  })

  it('should match [section: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('section')
      .toEqualTypeOf<string>()
  })
})
