import type { ObjectPlain } from '@flex-development/tutils'
import validator from '@grease/constraints/is-target-branch.constraint'
import type { IsTargetBranchOptions } from '@grease/interfaces'
import type { ValidationMessage } from '@grease/types'
import type { ValidateByOptions } from 'class-validator'
import { ValidateBy } from 'class-validator'

/**
 * @file Decorator - IsTargetBranch
 * @module grease/decorators/IsTargetBranch
 */

/**
 * Custom decorator that checks if a value is the name of a branch or commit SHA
 * in the current repository.
 *
 * @param {IsTargetBranchOptions} [options] - Validation options
 * @param {boolean} [options.always] - Perform validation and ignore `groups`
 * @param {ObjectPlain} [options.context] - Custom validation context
 * @param {string} [options.dir=process.env.PWD] - `.git` directory
 * @param {string[]} [options.groups] - Groups used for this validation
 * @param {ValidationMessage} [options.message] - Custom error message
 * @param {string} [options.remote='origin'] - Name of remote
 * @param {boolean} [options.sha] - Allow Git commit SHAs
 * @return {PropertyDecorator} Property decorator
 */
const IsTargetBranch = (
  options: IsTargetBranchOptions = {}
): PropertyDecorator => {
  const validateByOptions: ValidateByOptions = {
    async: validator.options?.async,
    constraints: [options],
    name: validator.options?.name as string,
    validator
  }

  return ValidateBy(validateByOptions, options)
}

export default IsTargetBranch
