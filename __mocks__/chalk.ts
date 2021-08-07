/**
 * @file Node Module Mock - chalk
 * @module mocks/chalk
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/chalk/chalk
 */

export default {
  blue: jest.fn(),
  bold: jest.fn(),
  dim: jest.fn(),
  green: jest.fn(),
  red: jest.fn(),
  white: jest.fn(),
  yellow: jest.fn()
}
