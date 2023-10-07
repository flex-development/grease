/**
 * @file Type Tests - IGreaseConfig
 * @module grease/config/interfaces/tests/unit-d/IGreaseConfig
 */

import type { ChangelogOperationDTO } from '#src/changelog'
import type { GlobalOptions } from '#src/options'
import type { Omit, Optional, Partial } from '@flex-development/tutils'
import type TestSubject from '../grease-config.interface'

describe('unit-d:config/interfaces/IGreaseConfig', () => {
  it('should extend Partial<GlobalOptions>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Partial<GlobalOptions>>()
  })

  it('should match [changelog?: Omit<ChangelogOperationDTO<T>, keyof GlobalOptions | "from">]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('changelog')
      .toEqualTypeOf<
        Optional<Omit<ChangelogOperationDTO, keyof GlobalOptions | 'from'>>
      >()
  })
})
