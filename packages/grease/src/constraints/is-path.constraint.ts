import { IsPathCode as Code } from '@grease/enums/is-path-code.enum'
import { IsPathMessage as Msg } from '@grease/enums/is-path-message.enum'
import type { IsPathOptions } from '@grease/interfaces'
import type {
  IConstraint,
  PathLike,
  ValidationMessage,
  ValidatorConstraintOptions
} from '@grease/types'
import type { ValidationArguments } from 'class-validator'
import {
  buildMessage,
  ValidatorConstraint as Constraint
} from 'class-validator'
import { existsSync } from 'fs'
import merge from 'lodash.merge'
import { join } from 'path'

/**
 * @file Decorator Constraints - IsPathConstraint
 * @module grease/constraints/IsPath
 */

/**
 * Custom validator for the `IsPath` decorator.
 *
 * @implements {IConstraint}
 */
@Constraint(IsPathConstraint.options)
export default class IsPathConstraint implements IConstraint {
  /**
   * @static
   * @readonly
   * @property {ValidatorConstraintOptions} options - Custom constraint options
   */
  static readonly options: ValidatorConstraintOptions = {
    async: false,
    name: 'isPath'
  }

  /**
   * Returns the default error message if validation fails.
   *
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsPathOptions} args.constraints.0 - Validation options
   * @param {ValidationMessage} [args.constraints.0.message] - Error message
   * @return {string} Default error message
   */
  defaultMessage(args: ValidationArguments): string {
    const { constraints = [] } = args

    // Get decorator constraint name
    const name = IsPathConstraint.options?.name as string

    // Get error code and message
    const code = constraints[0].context[name].error.code || Code.PATH_LIKE
    const message = Msg[code] || Msg.PATH_LIKE

    return buildMessage(prefix => `${prefix}${message}`, constraints[0])()
  }

  /**
   * Returns `true` if `value` is `string | Buffer | String | URL`.
   *
   * @param {any} value - Value to test against constraint
   * @return {boolean} Boolean indicating value is `PathLike`
   */
  isPathLike(value: any): value is PathLike {
    const constructors = { Buffer: true, String: true, URL: true }
    const object = constructors[value?.constructor?.name] || false

    return typeof value === 'string' || object
  }

  /**
   * Checks if `value` is a valid file system path where the type is `string |
   * Buffer | String | URL`, aka `PathLike`.
   *
   * If `args.constraints[0].exists` is `true` (the default), the function will
   * return `false` if the path does not exist within the file system.
   *
   * If validation fails, the arguments context `args.constraints[0].context`,
   * will be modified.
   *
   * @param {any} value - Value to test against constraint
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsPathOptions} args.constraints.0 - Validation options
   * @param {boolean} [args.constraints.0.cwd] - Prepend `process.cwd()`
   * @param {boolean} [args.constraints.0.exists] - Check if path exists
   * @param {boolean} [args.constraints.0.gh] - Treat as GitHub release asset
   * path and ignore possible display label (e.g: `'/asset.zip#My label'`)
   * @return {boolean} Boolean indicating if value is `PathLike` and may exist
   */
  validate(value: any, args: ValidationArguments): value is PathLike {
    // Get decorator constraint name and default args context
    const name = IsPathConstraint.options?.name as string
    const context = { [name]: { error: {} } }

    // Format validation options
    args.constraints[0] = merge({}, args.constraints[0], { context })

    // Get validation options
    const {
      cwd = false,
      exists = true,
      gh = false
    } = args.constraints[0] as IsPathOptions

    // Return `false` if path does not match `PathLike` schema
    if (!this.isPathLike(value)) {
      args.constraints[0].context[name].error.code = Code.PATH_LIKE
      return false
    }

    // If path is a `String` object, convert into `string` primitive
    if (value?.constructor?.name === 'String') value = value.valueOf()

    // If path is `string` primitive, handle `cwd`, `dirname`, and `gh` options
    if (typeof value === 'string') {
      // If treating as GitHub release asset path, remove possible label
      value = gh ? value.split('#')[0] : value

      // Prefix path with `process.cwd()`
      if (cwd) value = join(process.cwd(), `${value}`)
    }

    // Check for path existence
    if (exists && !existsSync(value)) {
      args.constraints[0].context[name].error.code = Code.DOES_NOT_EXIST
      return false
    }

    // path is `PathLike` and might exist within file system
    return true
  }
}
