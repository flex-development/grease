/**
 * @file Type Tests - IGreaseConfig
 * @module grease/config/interfaces/tests/unit-d/IGreaseConfig
 */

import type { GlobalOptions } from '#src/options'
import type { Partial } from '@flex-development/tutils'
import type TestSubject from '../grease-config.interface'

describe('unit-d:config/interfaces/IGreaseConfig', () => {
  it('should extend Partial<GlobalOptions>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Partial<GlobalOptions>>()
  })
})
