/**
 * @file E2E Tests - api
 * @module grease-util-config/tests/e2e/api
 */

import * as testSubject from '@flex-development/grease-util-config'

describe('e2e:grease-util-config', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
