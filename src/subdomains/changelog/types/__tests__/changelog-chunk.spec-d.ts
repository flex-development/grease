/**
 * @file Type Tests - ChangelogChunk
 * @module grease/changelog/types/tests/unit-d/ChangelogChunk
 */

import type { ChangelogEntry, ChangelogInfile } from '#src/changelog/models'
import type { Stringafiable } from '@flex-development/tutils'
import type TestSubject from '../changelog-chunk'

describe('unit-d:changelog/types/ChangelogChunk', () => {
  it('should extract ChangelogEntry<T>', () => {
    expectTypeOf<TestSubject>().extract<ChangelogEntry>().not.toBeNever()
  })

  it('should extract ChangelogInfile', () => {
    expectTypeOf<TestSubject>().extract<ChangelogInfile>().not.toBeNever()
  })

  it('should extract Stringafiable', () => {
    expectTypeOf<TestSubject>().extract<Stringafiable>().not.toBeNever()
  })

  it('should extract null', () => {
    expectTypeOf<TestSubject>().extract<null>().not.toBeNever()
  })
})
