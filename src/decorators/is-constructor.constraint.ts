/**
 * @file Decorators - IsConstructorConstraint
 * @module grease/decorators/IsConstructorConstraint
 */

import {
  cast,
  get,
  isFunction,
  template,
  type Constructor,
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
 * Function validator.
 *
 * @class
 * @implements {IValidatorConstraint}
 */
@ValidatorConstraint(IsConstructorConstraint.options)
class IsConstructorConstraint implements IValidatorConstraint {
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
    name: 'isConstructor'
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
      prefix => template('{prefix}$property must be a constructor', { prefix }),
      cast<Optional<ValidationOptions>>(get(args, 'constraints.0'))
    )()
  }

  /**
   * Check if `value` is a constructor.
   *
   * @public
   *
   * @param {unknown} value - Value to check
   * @return {value is Constructor<any>} `true` if value is a constructor
   */
  public validate(value: unknown): value is Constructor<any> {
    if (isFunction(value)) {
      try {
        new new Proxy<Constructor<any>>(cast(value), {
          construct() {
            return {}
          }
        })()
        return true
      } catch {
        return false
      }
    }

    return false
  }
}

export default IsConstructorConstraint
