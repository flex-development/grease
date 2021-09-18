import type { ObjectPlain } from '@flex-development/tutils'
import validator from '@grease/constraints/is-sem-ver.constraint'
import type { IsSemVerOptions } from '@grease/interfaces'
import type {
  GitSemverTagsOptions,
  IsSemVerOptionsClean as CleanConfig,
  IsSemVerOptionsCMP as CMPConfig,
  IsSemVerOptionsSatisfies as SatisfiesConfig,
  ValidationMessage
} from '@grease/types'
import type { ValidateByOptions } from 'class-validator'
import { ValidateBy } from 'class-validator'
import type { CoerceOptions } from 'semver'

/**
 * @file Decorator - IsSemVer
 * @module grease/decorators/IsSemVer
 */

/**
 * Custom decorator that checks if a value is a valid [semantic version][1].
 *
 * [1]: https://github.com/npm/node-semver
 *
 * @param {IsSemVerOptions} [options] - Validation options
 * @param {boolean} [options.always] - Perform validation and ignore `groups`
 * @param {CleanConfig} [options.clean] - Remove tag prefix and any leading or
 * trailing whitespaces from value
 * @param {CMPConfig} [options.cmp] - Compare to another version
 * @param {CoerceOptions | boolean} [options.coerce] - Coerce value to semantic
 * version if possible
 * @param {ObjectPlain} [options.context] - Custom validation context
 * @param {boolean} [options.each] - Specifies if value is an array, map, or set
 * and each of its items must be validated (instead of the value itself)
 * @param {GitSemverTagsOptions | boolean} [options.git] - Check if value is
 * semantic version tag pushed to the current repository
 * @param {string[]} [options.groups] - Groups used for this validation
 * @param {ValidationMessage} [options.message] - Custom error message
 * @param {boolean} [options.negit] - Check if value is semantic version tag,
 * but **not** pushed to the current repository
 * @param {SatisfiesConfig} [options.satisfies] - Check if value is semantic
 * version tag and satisfies specified range
 * @return {PropertyDecorator} Property decorator
 */
const IsSemVer = (options: IsSemVerOptions = {}): PropertyDecorator => {
  const validateByOptions: ValidateByOptions = {
    async: validator.options?.async,
    constraints: [options],
    name: validator.options?.name as string,
    validator
  }

  return ValidateBy(validateByOptions, options)
}

export default IsSemVer
