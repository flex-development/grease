/**
 * @file Type Tests - ChangelogOperation
 * @module grease/changelog/operations/tests/unit-d/ChangelogOperation
 */

import type { ChangelogFormatter } from '#src/changelog/models'
import type { ChangelogQuery } from '#src/changelog/queries'
import type { Commit } from '#src/git'
import type { Optional } from '@flex-development/tutils'
import type TestSubject from '../changelog.operation'

describe('unit-d:changelog/operations/ChangelogOperation', () => {
  it('should extend ChangelogQuery<T>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<ChangelogQuery>()
  })

  it('should match [Formatter: typeof ChangelogFormatter<T>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('Formatter')
      .toEqualTypeOf<typeof ChangelogFormatter<Commit>>()
  })

  it('should match [infile?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('infile')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [quiet: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('quiet')
      .toEqualTypeOf<boolean>()
  })

  it('should match [outfile?: Optional<string>]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('outfile')
      .toEqualTypeOf<Optional<string>>()
  })

  it('should match [samefile: boolean]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('samefile')
      .toEqualTypeOf<boolean>()
  })

  it('should match [write: boolean]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('write').toEqualTypeOf<boolean>()
  })
})
