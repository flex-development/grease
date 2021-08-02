import type { ObjectPlain } from '@flex-development/tutils'
import validator from '@grease/constraints/is-branch.constraint'
import type { IsBranchOptions } from '@grease/interfaces'
import type { ValidationMessage } from '@grease/types'
import type { ValidateByOptions } from 'class-validator'
import { ValidateBy } from 'class-validator'

/**
 * @file Decorator - IsBranch
 * @module grease/decorators/IsBranch
 */

/**
 * Custom decorator that checks if a value is a local or remote branch in the
 * current repository.
 *
 * @param {IsBranchOptions} [options] - Validation options
 * @param {boolean} [options.always] - Perform validation and ignore `groups`
 * @param {ObjectPlain} [options.context] - Custom validation context
 * @param {string[]} [options.groups] - Groups used for this validation
 * @param {ValidationMessage} [options.message] - Custom error message
 * @param {string} [options.remote] - Name of remote
 * @return {PropertyDecorator} Property decorator
 */
const IsBranch = (options: IsBranchOptions = {}): PropertyDecorator => {
  const validateByOptions: ValidateByOptions = {
    async: validator.options?.async,
    constraints: [options],
    name: validator.options?.name as string,
    validator
  }

  return ValidateBy(validateByOptions, options)
}

export default IsBranch
