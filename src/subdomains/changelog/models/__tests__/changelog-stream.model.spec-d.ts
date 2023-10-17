/**
 * @file Type Tests - ChangelogStream
 * @module grease/changelog/models/tests/unit-d/ChangelogStream
 */

import type { ReadonlyKeys } from '@flex-development/tutils'
import type stream from 'node:stream'
import TestSubject from '../changelog-stream.model'

describe('unit-d:changelog/models/ChangelogStream', () => {
  it('should extend stream.Transform', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<stream.Transform>()
  })

  it('should match [readonly debug: boolean]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'debug'>().toBeString()
    expectTypeOf<TestSubject>().toHaveProperty('debug').toEqualTypeOf<boolean>()
  })

  it('should match [readonly writer: stream.Writable]', () => {
    expectTypeOf<ReadonlyKeys<TestSubject>>().extract<'writer'>().toBeString()
    expectTypeOf<TestSubject>()
      .toHaveProperty('writer')
      .toEqualTypeOf<stream.Writable>()
  })
})
