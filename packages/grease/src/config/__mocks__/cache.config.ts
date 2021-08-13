import defaults from '@grease/config/defaults.config'

/**
 * @file User Module Mock - cache
 * @module config/mocks/cache
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

class MockCache {
  git = {}
  options = defaults
  setOptions = jest.fn()
}

export default new MockCache()
