/**
 * @file Node Module Mock - lodash/pick
 * @module grease/tests/mocks/lodash/pick
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/lodash/lodash
 */

export default jest.fn((...args) => jest.requireActual('lodash/pick')(...args))
