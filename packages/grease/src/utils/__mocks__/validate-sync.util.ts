/**
 * @file User Module Mock - validateSync
 * @module utils/mocks/validateSync
 * @see https://jestjs.io/docs/manual-mocks#mocking-user-modules
 */

export default jest.fn((...args) => {
  return jest.requireActual('../validate-sync.util').default(...args)
})
