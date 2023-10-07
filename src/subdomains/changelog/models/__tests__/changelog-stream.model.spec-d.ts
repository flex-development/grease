/**
 * @file Type Tests - ChangelogStream
 * @module grease/changelog/models/tests/unit-d/ChangelogStream
 */

import type stream from 'node:stream'
import type TestSubject from '../changelog-stream.model'

describe('unit-d:changelog/models/ChangelogStream', () => {
  it('should extend stream.Transform', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<stream.Transform>()
  })
})
