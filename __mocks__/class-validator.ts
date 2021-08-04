import * as item from 'class-validator'

/**
 * @file Node Module Mock - class-validator
 * @module mocks/class-validator
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/typestack/class-validator
 */

const actual = jest.requireActual<typeof item>('class-validator')

export const buildMessage = jest.fn(actual.buildMessage)
export const validate = jest.fn(actual.validate)
export const validateOrReject = jest.fn(actual.validateOrReject)
export const IsBoolean = jest.fn(actual.IsBoolean)
export const IsEnum = jest.fn(actual.IsEnum)
export const IsNotEmpty = jest.fn(actual.IsNotEmpty)
export const IsOptional = jest.fn(actual.IsOptional)
export const IsString = jest.fn(actual.IsString)
export const ValidateBy = jest.fn(actual.ValidateBy)
export const ValidateIf = jest.fn(actual.ValidateIf)
export const ValidateNested = jest.fn(actual.ValidateNested)
export const ValidatorConstraint = jest.fn(actual.ValidatorConstraint)
