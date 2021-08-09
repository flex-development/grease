/**
 * @file User Module Mock - validate
 * @module utils/mocks/validate
 * @see https://jestjs.io/docs/manual-mocks#mocking-user-modules
 */

export default jest.fn((...args) => {
  return jest.requireActual('../validate.util').default(...args)
})
