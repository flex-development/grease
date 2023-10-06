/**
 * @file Decorators - IsFileConstraint
 * @module grease/decorators/IsFileConstraint
 */

import { isFile, toURL } from '@flex-development/mlly'
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
  type ValidatorConstraintInterface as IValidatorConstraint,
  type ValidationArguments,
  type ValidationOptions
} from 'class-validator'

/**
 * File validator.
 *
 * @class
 * @implements {IValidatorConstraint}
 */
@ValidatorConstraint(IsFileConstraint.options)
class IsFileConstraint implements IValidatorConstraint {
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
    name: isFile.name
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
    return buildMessage(
      prefix => {
        return template('{prefix}$property must be a file path or url', {
          prefix
        })
      },
      cast<Optional<ValidationOptions>>(get(args, 'constraints.0'))
    )()
  }

  /**
   * Check if `value` is the path to a file.
   *
   * @public
   *
   * @param {unknown} value - Value to check
   * @return {value is string} `true` if value path to a file
   */
  public validate(value: unknown): value is string {
    return isString(value) && isFile(toURL(value))
  }
}

export default IsFileConstraint
