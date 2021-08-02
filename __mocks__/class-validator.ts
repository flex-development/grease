import * as item from 'class-validator'

/**
 * @file Node Module Mock - class-validator
 * @module mocks/class-validator
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/typestack/class-validator
 */

const actual = jest.requireActual<typeof item>('class-validator')

export const buildMessage = jest.fn(actual.buildMessage)
export const validate = jest.fn(actual.validate)
export const ValidateBy = jest.fn(actual.ValidateBy)
export const ValidatorConstraint = jest.fn(actual.ValidatorConstraint)
