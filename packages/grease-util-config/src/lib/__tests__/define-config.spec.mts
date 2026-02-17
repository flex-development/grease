/**
 * @file Unit Tests - defineConfig
 * @module grease-util-config/lib/tests/unit/defineConfig
 */

import testSubject from '#lib/define-config'
import type { UserConfigOption } from '@flex-development/grease-util-types'

describe('unit:lib/defineConfig', () => {
  it.each<[unknown?]>([
    [],
    [[]],
    [null]
  ])('should return empty user config object (%#)', config => {
    expect(testSubject(config)).to.eql({}).and.not.eq(config)
  })

  it.each<[UserConfigOption]>([
    [{}],
    [vi.fn(() => ({})).mockName('config')]
  ])('should return `config` (%#)', config => {
    expect(testSubject(config)).to.eq(config)
  })
})
