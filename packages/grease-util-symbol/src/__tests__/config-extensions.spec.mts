/**
 * @file Unit Tests - configExtensions
 * @module grease-util-config/tests/unit/configExtensions
 */

import testSubject from '#lib/config-extensions'

describe('unit:configExtensions', () => {
  it('should be file extension list', () => {
    expect(testSubject).toMatchSnapshot()
  })
})
