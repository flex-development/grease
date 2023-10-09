/**
 * @file Type Tests - IGreaseConfig
 * @module grease/config/interfaces/tests/unit-d/IGreaseConfig
 */

import type { ChangelogOperationDTO } from '#src/changelog'
import type { TagOperationDTO } from '#src/git'
import type { GlobalOptions } from '#src/options'
import type { Optional, Partial } from '@flex-development/tutils'
import type TestSubject from '../grease-config.interface'
import type { GreaseConfigHelper } from '../grease-config.interface'

describe('unit-d:config/interfaces/IGreaseConfig', () => {
  it('should extend Partial<GlobalOptions>', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<Partial<GlobalOptions>>()
  })

  it('should match [changelog?: GreaseConfigHelper<ChangelogOperationDTO<T>, "from">]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('changelog')
      .toEqualTypeOf<
        Optional<GreaseConfigHelper<ChangelogOperationDTO, 'from'>>
      >()
  })

  it('should match [tag?: GreaseConfigHelper<TagOperationDTO, "tag">', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('tag')
      .toEqualTypeOf<Optional<GreaseConfigHelper<TagOperationDTO, 'tag'>>>()
  })
})
