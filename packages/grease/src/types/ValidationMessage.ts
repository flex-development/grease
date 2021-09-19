import type { ValidationArguments } from 'class-validator'

/**
 * @file Type Definitions - ValidationMessage
 * @module grease/types/ValidationMessage
 */

/**
 * Error message to be used on validation fail.
 * Message can be either string or a function that returns a string.
 */
export type ValidationMessage = string | ((args: ValidationArguments) => string)
