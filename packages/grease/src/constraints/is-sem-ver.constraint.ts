import { IsSemVerCode as Code, IsSemVerMessage as Msg } from '@grease/enums'
import type { IsSemVerOptions } from '@grease/interfaces'
import type {
  GitSemverTagsOptions,
  IConstraint,
  IsSemVerOptionsConfigClean as CleanConfig,
  IsSemVerOptionsConfigCMP as CMPConfig,
  IsSemVerOptionsConfigSatisfies as SatisfiesConfig,
  SemanticVersion,
  ValidatorConstraintOptions
} from '@grease/types'
import semver from '@grease/utils/semver.util'
import type { ValidationArguments } from 'class-validator'
import {
  buildMessage,
  ValidatorConstraint as Constraint
} from 'class-validator'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'
import type { CoerceOptions } from 'semver'

/**
 * @file Decorator Constraints - IsSemVerConstraint
 * @module grease/constraints/IsSemVer
 */

/**
 * Custom validator for the `IsSemVer` decorator.
 *
 * @implements {IConstraint}
 */
@Constraint(IsSemVerConstraint.options)
export default class IsSemVerConstraint implements IConstraint {
  /**
   * @static
   * @readonly
   * @property {ValidatorConstraintOptions} options - Custom constraint options
   */
  static readonly options: ValidatorConstraintOptions = {
    async: false,
    name: 'isSemVer'
  }

  /**
   * Returns the default error message if validation fails.
   *
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsSemVerOptions} args.constraints.0 - Validation options
   * @return {string} Default error message
   */
  defaultMessage(args: ValidationArguments): string {
    const { constraints = [] } = args
    const options = constraints[0] as IsSemVerOptions

    // Get decorator constraint name
    const name = IsSemVerConstraint.options?.name as string

    // Get error code
    const code = constraints[0].context[name].error.code || Code.SEM_VER

    // Init error message
    let message: string = Msg.SEM_VER

    // Get IsSemVerOptions.cmp error message
    if (code === Code.CMP && options.cmp?.length) {
      const [operator, version] = options.cmp

      message = `${Msg.CMP} ${operator} ${version.toString()}`
    }

    // Get IsSemVerOptions.negit error message
    if (code === Code.CONFLICT) message = Msg.CONFLICT

    // Get IsSemVerOptions.git error message
    if (code === Code.DOES_NOT_EXIST) message = Msg.DOES_NOT_EXIST

    // Get IsSemVerOptions.satisfies error message
    if (code === Code.RANGE_UNSATISFIED && options.satisfies?.length) {
      message = `${Msg.RANGE_UNSATISFIED} ${options.satisfies[0].toString()}`
    }

    return buildMessage(prefix => `${prefix}${message}`, constraints[0])()
  }

  /**
   * Checks if `value` is a valid [semantic version][1].
   *
   * If validation fails, the arguments context `args.constraints[0].context`,
   * will be modified.
   *
   * [1]: https://github.com/npm/node-semver
   *
   * @param {any} value - Value to test against constraint
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsSemVerOptions} [args.constraints.0] - Validation options
   * @param {CleanConfig} [args.constraints.0.clean] - Remove tag prefix and any
   * leading or trailing whitespaces from value
   * @param {CMPConfig} [args.constraints.0.cmp] - Compare to another version
   * @param {CoerceOptions | boolean} [args.constraints.0.coerce] - Coerce
   * value to semantic version if possible
   * @param {GitSemverTagsOptions | boolean} [args.constraints.0.git] - Check if
   * value is semantic version tag pushed to the current repository
   * @param {boolean} [args.constraints.0.negit] - Check if value is semantic
   * version tag, but **not** pushed to the current repository
   * @param {SatisfiesConfig} [args.constraints.0.satisfies] - Check if value
   * is semantic version and satisfies specified range
   * @return {boolean} Boolean indicating if value is valid semantic version
   */
  validate(value: any, args: ValidationArguments): value is SemanticVersion {
    // Get decorator constraint name and default args context
    const name = IsSemVerConstraint.options?.name as string
    const context = { [name]: { error: {} } }

    // Format validation options
    args.constraints[0] = merge({}, args.constraints[0], { context })

    // Get validation options
    const {
      clean = false,
      cmp = [],
      coerce = false,
      git = false as NonNullable<IsSemVerOptions['git']>,
      negit = false,
      satisfies = [] as unknown as NonNullable<IsSemVerOptions['satisfies']>
    } = args.constraints[0] as IsSemVerOptions

    // Strinigify value
    let version = value?.toString() ?? ''

    // Remove tag prefix and any leading or trailing whitespaces
    if (clean === true || Array.isArray(clean)) {
      const [tagPrefix, options] = typeof clean === 'boolean' ? [] : clean
      version = semver.clean(version, tagPrefix, options)
    }

    // Coerce if possible
    if (isPlainObject(coerce) || coerce === true) {
      const options = typeof coerce === 'boolean' ? {} : coerce
      version = semver.coerce(version, options as CoerceOptions)?.toString()
    }

    // Check if valid semantic version
    if (!semver.valid(version)) {
      args.constraints[0].context[name].error.code = Code.SEM_VER
      return false
    }

    // Perform version comparison
    if (cmp.length >= 2) {
      const [operator, version2, options] = cmp as CMPConfig

      const pass = semver.cmp(version, operator, version2.toString(), options)

      if (!pass) {
        args.constraints[0].context[name].error.code = Code.CMP
        return false
      }
    }

    // Check range
    if (satisfies.length >= 1) {
      const [range, options] = satisfies as SatisfiesConfig

      const satisfied = semver.satisfies(version, range, options)

      if (!satisfied) {
        args.constraints[0].context[name].error.code = Code.RANGE_UNSATISFIED
        return false
      }
    }

    // Perform Git tag search
    if (git || negit) {
      const options = typeof git === 'boolean' ? {} : git

      const tags = semver.tags(options as GitSemverTagsOptions)
      const tag = tags.find(tag => tag.match(version))

      if (!negit && !tag) {
        args.constraints[0].context[name].error.code = Code.DOES_NOT_EXIST
        return false
      }

      if (negit && tag) {
        args.constraints[0].context[name].error.code = Code.CONFLICT
        return false
      }
    }

    return true
  }
}
