import { ValidatorConstraint } from 'class-validator'
/**
 * @file Type Definitions - ValidatorConstraintOptions
 * @module grease/types/ValidatorConstraintOptions
 */

/**
 * [Custom validation class][1] options.
 *
 * [1]: https://github.com/typestack/class-validator#custom-validation-classes
 */
export type ValidatorConstraintOptions = Parameters<
  typeof ValidatorConstraint
>[0]
