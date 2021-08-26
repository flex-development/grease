/**
 * @file User Module Mock - getPrerelease
 * @module config/mocks/getPrerelease
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

export default jest.fn((...args) => {
  return jest.requireActual('../get-prerelease.util').default(...args)
})
