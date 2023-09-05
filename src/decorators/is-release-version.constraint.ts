/**
 * @file Decorators - IsReleaseVersionConstraint
 * @module grease/decorators/IsReleaseVersionConstraint
 */

import { ReleaseType } from '#src/enums'
import type { ReleaseVersion } from '#src/types'
import {
  cast,
  get,
  isString,
  template,
  type Optional
} from '@flex-development/tutils'
import {
  ValidatorConstraint,
  buildMessage,
  isEnum,
  type ValidatorConstraintInterface as IValidatorConstraint,
  type ValidationArguments,
  type ValidationOptions
} from 'class-validator'
import util from 'node:util'
import semver from 'semver'

/**
 * Release version validator.
 *
 * @class
 * @implements {IValidatorConstraint}
 */
@ValidatorConstraint(IsReleaseVersionConstraint.options)
class IsReleaseVersionConstraint implements IValidatorConstraint {
  /**
   * Validator constraint options.
   *
   * @public
   * @static
   * @readonly
   * @member {{ async: boolean; name: string }} options
   */
  public static readonly options: { async: boolean; name: string } = {
    async: false,
    name: 'isReleaseVersion'
  }

  /**
   * Get the default validation failure message.
   *
   * @see {@linkcode ValidationArguments}
   *
   * @public
   *
   * @param {ValidationArguments} args - Validation arguments
   * @return {string} Default validation failure message
   */
  public defaultMessage(args: ValidationArguments): string {
    /**
     * Default message template.
     *
     * @const {string} tmp
     */
    const tmp: string =
      '{prefix}$property must be release type or semantic version; received {value}'

    return buildMessage(
      prefix => template(tmp, { prefix, value: util.inspect(args.value) }),
      cast<Optional<ValidationOptions>>(get(args, 'constraints.0'))
    )()
  }

  /**
   * Check if `value` is a release type or semantic version.
   *
   * @public
   *
   * @param {unknown} value - Value to check
   * @return {value is ReleaseVersion} `true` if value is valid release version
   */
  public validate(value: unknown): value is ReleaseVersion {
    return isString(value) &&
      (!!semver.valid(value) || isEnum(value, ReleaseType))
  }
}

export default IsReleaseVersionConstraint
