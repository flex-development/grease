/**
 * @file Type Tests - BumpFile
 * @module grease/bump/types/tests/unit-d/BumpFile
 */

import type { Manifest } from '#src/models'
import type { Constructor } from '@flex-development/tutils'
import type TestSubject from '../bump-file'

describe('unit-d:bump/types/BumpFile', () => {
  it('should equal Constructor<Manifest, [string]>', () => {
    expectTypeOf<TestSubject>()
      .toEqualTypeOf<Constructor<Manifest, [string]>>()
  })
})
