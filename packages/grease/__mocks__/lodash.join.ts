/**
 * @file Node Module Mock - lodash.join
 * @module grease/tests/mocks/lodash.join
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/lodash/lodash
 */

export default jest.fn((...args) => jest.requireActual('lodash.join')(...args))
