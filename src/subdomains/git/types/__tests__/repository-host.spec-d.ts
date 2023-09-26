/**
 * @file Type Tests - RepositoryHost
 * @module grease/git/types/tests/unit-d/RepositoryHost
 */

import type { RepositoryProvider } from '#src/git/enums'
import type { Dot } from '@flex-development/tutils'
import type TestSubject from '../repository-host'

describe('unit-d:git/types/RepositoryHost', () => {
  it('should equal `${RepositoryProvider}${Dot}${"com" | "org"}`', () => {
    expectTypeOf<TestSubject>()
      .toEqualTypeOf<`${RepositoryProvider}${Dot}${'com' | 'org'}`>()
  })
})
