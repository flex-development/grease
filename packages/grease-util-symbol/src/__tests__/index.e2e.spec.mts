/**
 * @file E2E Tests - api
 * @module grease-util-symbol/tests/e2e/api
 */

import * as testSubject from '@flex-development/grease-util-symbol'

describe('e2e:grease-util-symbol', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
