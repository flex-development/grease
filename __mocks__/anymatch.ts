/**
 * @file Node Module Mock - anymatch
 * @module mocks/anymatch
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/micromatch/anymatch
 */

export default jest.fn((...args) => {
  return jest.requireActual('anymatch').default(...args)
})
