/**
 * @file Node Module Mock - @flex-development/log
 * @module grease/tests/mocks/flex-development/log
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/flex-development/log
 */

export default jest.fn((...args) => {
  return jest.requireActual('@flex-development/log').default(...args)
})
