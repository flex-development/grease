/**
 * @file Type Tests - ChangelogInfile
 * @module grease/changelog/models/tests/unit-d/ChangelogInfile
 */

import type { ReadonlyKeys, Stringafiable } from '@flex-development/tutils'
import TestSubject from '../changelog-infile.model'

describe('unit-d:changelog/models/ChangelogInfile', () => {
  it('should implement Stringafiable', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Stringafiable>()
  })

  it('should match [readonly path: string]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'path'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('path').toEqualTypeOf<string>()
  })
})
