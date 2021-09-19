/**
 * @file User Module Mock - getOptions
 * @module config/mocks/getOptions
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

export default jest.fn((...args) => {
  return jest.requireActual('../get-options.util').default(...args)
})
