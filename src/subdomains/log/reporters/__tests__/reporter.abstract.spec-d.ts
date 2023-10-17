/**
 * @file Type Tests - Reporter
 * @module grease/log/reporters/tests/unit-d/Reporter
 */

import type { LogObject } from '#src/log/models'
import type { Fn } from '@flex-development/tutils'
import TestSubject from '../reporter.abstract'

describe('unit-d:log/reporters/Reporter', () => {
  it('should match [write(log: LogObject): void]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('write')
      .toMatchTypeOf<Fn<[LogObject], void>>()
  })
})
