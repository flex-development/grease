/**
 * @file Type Tests - ChangelogQuery
 * @module grease/changelog/queries/tests/unit-d/ChangelogQuery
 */

import type { ChangelogAggregator, CommitType } from '#src/changelog/models'
import type { Commit, CommitQuery } from '#src/git'
import type TestSubject from '../changelog.query'

describe('unit-d:changelog/queries/ChangelogQuery', () => {
  it('should extend CommitQuery<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<CommitQuery>()
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
})
