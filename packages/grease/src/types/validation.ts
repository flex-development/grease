import type { TransformValidationOptions } from 'class-transformer-validator'
import type { ValidationArguments } from 'class-validator'
import { ValidatorConstraint } from 'class-validator'
import type fs from 'fs'

/**
 * @file Type Definitions - Validation
 * @module grease/types/validation
 */

/**
 * Valid file paths.
 */
/* eslint-disable-next-line @typescript-eslint/ban-types */
export type PathLike = fs.PathLike | String

/**
 * Default options object for [`class-transformer-validator`][1].
 *
 * [1]: https://github.com/MichalLytek/class-transformer-validator
 */
export type TVODefaults = Readonly<TransformValidationOptions>

/**
 * [Custom validation class][1] options.
 *
 * [1]: https://github.com/typestack/class-validator#custom-validation-classes
 */
export type ValidatorConstraintOptions = Parameters<
  typeof ValidatorConstraint
>[0]

/**
 * Error message to be used on validation fail.
 * Message can be either string or a function that returns a string.
 */
export type ValidationMessage = string | ((args: ValidationArguments) => string)

// Rename `class-validator` type definitions
export { ValidatorConstraintInterface as IConstraint } from 'class-validator'
