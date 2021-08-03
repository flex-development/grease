/**
 * @file Node Module Mock - lodash/merge
 * @module mocks/lodash/merge
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/lodash/lodash
 */

export default jest.fn((...args) => jest.requireActual('lodash/merge')(...args))
