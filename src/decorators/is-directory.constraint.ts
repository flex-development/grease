/**
 * @file Decorators - IsDirectoryConstraint
 * @module grease/decorators/IsDirectoryConstraint
 */

import { isDirectory } from '@flex-development/mlly'
import { isAbsolute } from '@flex-development/pathe'
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
 * Directory path validator.
 *
 * @class
 * @implements {IValidatorConstraint}
 */
@ValidatorConstraint(IsDirectoryConstraint.options)
class IsDirectoryConstraint implements IValidatorConstraint {
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
    name: isDirectory.name
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
    const tmp: string = '{prefix}$property must be an absolute directory path'

    return buildMessage(
      prefix => template(tmp, { prefix }),
      cast<Optional<ValidationOptions>>(get(args, 'constraints.0'))
    )()
  }

  /**
   * Check if `value` is a directory path.
   *
   * @public
   *
   * @param {unknown} value - Value to check
   * @return {value is string} `true` if value is directory path
   */
  public validate(value: unknown): value is string {
    return isString(value) && isAbsolute(value) && isDirectory(value)
  }
}

export default IsDirectoryConstraint
