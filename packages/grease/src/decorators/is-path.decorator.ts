import type { ObjectPlain } from '@flex-development/tutils'
import validator from '@grease/constraints/is-path.constraint'
import type { IsPathOptions } from '@grease/interfaces'
import type { ValidationMessage } from '@grease/types'
import type { ValidateByOptions } from 'class-validator'
import { ValidateBy } from 'class-validator'

/**
 * @file Decorator - IsPath
 * @module grease/decorators/IsPath
 */

/**
 * Custom decorator that checks if a value is a valid file system path where the
 * value type is `string | Buffer | String | URL`, aka `PathLike`.
 *
 * @param {IsPathOptions} [options] - Validation options
 * @param {boolean} [options.always] - Perform validation and ignore `groups`
 * @param {ObjectPlain} [options.context] - Custom validation context
 * @param {boolean} [options.cwd] - Prepend `process.cwd()`
 * @param {boolean} [options.each] - Specifies if value is an array, map, or set
 * and each of its items must be validated (instead of the value itself)
 * @param {boolean} [options.exists=true] - Check if path exists in file system
 * @param {boolean} [options.gh] - Treat as GitHub release asset path and ignore
 * possible display label (e.g: `'/path/to/asset.zip#My display label'`)
 * @param {string[]} [options.groups] - Groups used for this validation
 * @param {ValidationMessage} [options.message] - Custom error message
 * @return {PropertyDecorator} Property decorator
 */
const IsPath = (options: IsPathOptions = {}): PropertyDecorator => {
  const validateByOptions: ValidateByOptions = {
    async: validator.options?.async,
    constraints: [options],
    name: validator.options?.name as string,
    validator
  }

  return ValidateBy(validateByOptions, options)
}

export default IsPath
