/**
 * @file Decorators - IsManifestIdConstraint
 * @module grease/decorators/IsManifestIdConstraint
 */

import {
  isFile,
  readPackageJson,
  type ModuleId
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import {
  cast,
  get,
  isString,
  isURL,
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
import { URL } from 'node:url'

/**
 * Package manifest module id validator.
 *
 * @class
 * @implements {IValidatorConstraint}
 */
@ValidatorConstraint(IsManifestIdConstraint.options)
class IsManifestIdConstraint implements IValidatorConstraint {
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
    name: 'isManifestId'
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
      '{prefix}$property must be module id of package directory or file'

    return buildMessage(
      prefix => template(tmp, { prefix }),
      cast<Optional<ValidationOptions>>(get(args, 'constraints.0'))
    )()
  }

  /**
   * Check if `value` is a package manifest module id.
   *
   * A package manifest module id is the module id of a `package.json` file, or
   * the module id of a directory containing a `package.json` file.
   *
   * @public
   *
   * @param {unknown} value - Value to check
   * @return {value is ModuleId} `true` if value is package manifest module id
   */
  public validate(value: unknown): value is ModuleId {
    if (!isString(value) && !isURL(value)) return false

    /**
     * Value to check.
     *
     * @var {ModuleId} val
     */
    let val: ModuleId = value

    // convert file url string to URL instance
    if (isString(val) && val.startsWith('file:///')) val = new URL(val)

    // convert package.json file to package directory
    if (isFile(val)) {
      val = get(val, 'pathname', val)
      if (isString(val) && val.endsWith('package.json')) {
        val = pathe.dirname(val)
      }
    }

    try {
      return !!readPackageJson(val)
    } catch {
      return false
    }
  }
}

export default IsManifestIdConstraint
