/**
 * @file Type Tests - IChangelogEntry
 * @module grease/changelog/interfaces/tests/unit-d/IChangelogEntry
 */

import type { BreakingChange, ICommit, Mention, Reference } from '#src/git'
import type { Nullable } from '@flex-development/tutils'
import type TestSubject from '../changelog-entry.interface'
import type ICommitGroup from '../commit-group.interface'

describe('unit-d:changelog/interfaces/IChangelogEntry', () => {
  it('should match [breaks: readonly BreakingChange[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('breaks')
      .toEqualTypeOf<readonly BreakingChange[]>()
  })

  it('should match [date: string]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('date').toEqualTypeOf<string>()
  })

  it('should match [groups: readonly ICommitGroup<T>[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('groups')
      .toEqualTypeOf<readonly ICommitGroup[]>()
  })

  it('should match [key: Readonly<T>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('key')
      .toEqualTypeOf<Readonly<ICommit>>()
  })

  it('should match [mentions: readonly Mention[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('mentions')
      .toEqualTypeOf<readonly Mention[]>()
  })

  it('should match [patch: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('patch').toEqualTypeOf<boolean>()
  })

  it('should match [prerelease: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('prerelease')
      .toEqualTypeOf<boolean>()
  })

  it('should match [previous: Nullable<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('previous')
      .toEqualTypeOf<Nullable<string>>()
  })

  it('should match [references: readonly Reference[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('references')
      .toEqualTypeOf<readonly Reference[]>()
  })

  it('should match release: string]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('release')
      .toEqualTypeOf<string>()
  })
})
