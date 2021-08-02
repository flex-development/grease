import {
  IsTargetBranchCode as Code,
  IsTargetBranchMessage as Msg
} from '@grease/enums'
import type { IsTargetBranchOptions } from '@grease/interfaces'
import type {
  IConstraint,
  ValidationMessage,
  ValidatorConstraintOptions
} from '@grease/types'
import type { ValidationArguments } from 'class-validator'
import {
  buildMessage,
  ValidatorConstraint as Constraint
} from 'class-validator'
import merge from 'lodash/merge'
import IsBranchConstraint from './is-branch.constraint'
import IsCommitConstraint from './is-commit.constraint'

/**
 * @file Decorator Constraints - IsTargetBranchConstraint
 * @module grease/constraints/IsTargetBranch
 */

/**
 * Custom validator for the `IsTargetBranch` decorator.
 *
 * @implements {IConstraint}
 */
@Constraint(IsTargetBranchConstraint.options)
export default class IsTargetBranchConstraint implements IConstraint {
  /**
   * @static
   * @readonly
   * @property {ValidatorConstraintOptions} options - Custom constraint options
   */
  static readonly options: ValidatorConstraintOptions = {
    async: true,
    name: 'isTargetBranch'
  }

  /**
   * Returns the default error message if validation fails.
   *
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsTargetBranchOptions} args.constraints.0 - Validation options
   * @param {ValidationMessage} [args.constraints.0.message] - Error message
   * @return {string} Default error message
   */
  defaultMessage(args: ValidationArguments): string {
    const { constraints = [] } = args

    // Get decorator constraint name
    const name = IsTargetBranchConstraint.options?.name as string

    // Get error code and message
    const code = constraints[0].context[name].error.code || Code.DOES_NOT_EXIST
    const message = Msg[code] || Msg.DOES_NOT_EXIST

    return buildMessage(prefix => `${prefix}${message}`, constraints[0])()
  }

  /**
   * Checks if `value` is the name of a branch or commit SHA (if enabled) in the
   * current repository.
   *
   * If validation fails, the arguments context `args.constraints[0].context`,
   * will be modified.
   *
   * @param {any} value - Value to test against constraint
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsTargetBranchOptions} args.constraints.0 - Validation options
   * @param {string} [args.constraints.0.remote='origin'] - Name of remote
   * @param {boolean} [args.constraints.0.sha] - Allow Git commit SHAs
   * @return {Promise<boolean>} Boolean indicating if value is branch or commit
   */
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // Get decorator constraint name and default args context
    const name = IsTargetBranchConstraint.options?.name as string
    const context = { [name]: { error: {} } }

    // Format validation options
    args.constraints[0] = merge({}, args.constraints[0], { context })

    // Get validation options
    const { remote, sha = false } = args.constraints[0] as IsTargetBranchOptions

    // Check if value is branch name or commit sha
    const branch = await new IsBranchConstraint().validate(value, {
      constraints: [{ remote: remote || 'origin' }]
    } as ValidationArguments)
    const commit = await new IsCommitConstraint().validate(value)

    // Invalidate if value is not branch name or commit sha
    if ((!sha && !branch) || (sha && !commit)) {
      args.constraints[0].context[name].error.code = Code.DOES_NOT_EXIST
      return false
    }

    return true
  }
}
