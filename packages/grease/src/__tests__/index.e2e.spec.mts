/**
 * @file E2E Tests - api
 * @module grease/tests/e2e/api
 */

import * as testSubject from '@flex-development/grease'

describe('e2e:grease', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
