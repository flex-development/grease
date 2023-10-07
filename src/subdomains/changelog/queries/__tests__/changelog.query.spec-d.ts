/**
 * @file Type Tests - ChangelogQuery
 * @module grease/changelog/queries/tests/unit-d/ChangelogQuery
 */

import type { ChangelogAggregator, CommitType } from '#src/changelog/models'
import type { Commit, GitCommitOptions } from '#src/git'
import type TestSubject from '../changelog.query'

describe('unit-d:changelog/queries/ChangelogQuery', () => {
  it('should extend GitCommitOptions<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GitCommitOptions>()
  })

  it('should match [Aggregator: typeof ChangelogAggregator<T>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('Aggregator')
      .toEqualTypeOf<typeof ChangelogAggregator<Commit>>()
  })

  it('should match [releases: number]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('releases')
      .toEqualTypeOf<number>()
  })

  it('should match [types: CommitType[]]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('types')
      .toEqualTypeOf<CommitType[]>()
  })

  it('should match [unstable: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('unstable')
      .toEqualTypeOf<boolean>()
  })
})
