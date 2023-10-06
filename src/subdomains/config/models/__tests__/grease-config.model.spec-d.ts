/**
 * @file Type Tests - GreaseConfig
 * @module grease/config/models/tests/unit-d/GreaseConfig
 */

import type { IGreaseConfig } from '#src/config/interfaces'
import type { GlobalOptions } from '#src/options'
import type TestSubject from '../grease-config.model'

describe('unit-d:config/models/GreaseConfig', () => {
  it('should extend GlobalOptions', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<GlobalOptions>()
  })

  it('should implement IGreaseConfig', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<IGreaseConfig>()
  })
})
