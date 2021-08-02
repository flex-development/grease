import type { ObjectPlain } from '@flex-development/tutils'
import validator from '@grease/constraints/is-commit.constraint'
import type { ValidationMessage } from '@grease/types'
import type { ValidateByOptions, ValidationOptions } from 'class-validator'
import { ValidateBy } from 'class-validator'

/**
 * @file Decorator - IsCommit
 * @module grease/decorators/IsCommit
 */

/**
 * Custom decorator that checks if a value is a commit in the current
 * repository.
 *
 * @param {ValidationOptions} [options] - Validation options
 * @param {boolean} [options.always] - Perform validation and ignore `groups`
 * @param {ObjectPlain} [options.context] - Custom validation context
 * @param {string[]} [options.groups] - Groups used for this validation
 * @param {ValidationMessage} [options.message] - Custom error message
 * @return {PropertyDecorator} Property decorator
 */
const IsCommit = (options: ValidationOptions = {}): PropertyDecorator => {
  const validateByOptions: ValidateByOptions = {
    async: validator.options?.async,
    constraints: [options],
    name: validator.options?.name as string,
    validator
  }

  return ValidateBy(validateByOptions, options)
}

export default IsCommit
