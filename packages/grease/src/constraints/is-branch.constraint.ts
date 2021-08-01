import { IsBranchMessage as Msg } from '@grease/enums/is-branch-message.enum'
import type { IsBranchOptions } from '@grease/interfaces'
import type { IConstraint, ValidatorConstraintOptions } from '@grease/types'
import type { ValidationArguments } from 'class-validator'
import {
  buildMessage,
  ValidatorConstraint as Constraint
} from 'class-validator'
import fs from 'fs'
import { listBranches } from 'isomorphic-git'
import merge from 'lodash/merge'

/**
 * @file Decorator Constraints - IsBranchConstraint
 * @module grease/constraints/IsBranch
 */

/**
 * Custom validator for the `IsBranch` decorator.
 *
 * @implements {IConstraint}
 */
@Constraint(IsBranchConstraint.options)
export default class IsBranchConstraint implements IConstraint {
  /**
   * @static
   * @readonly
   * @property {ValidatorConstraintOptions} options - Custom constraint options
   */
  static readonly options: ValidatorConstraintOptions = {
    async: true,
    name: 'isBranch'
  }

  /**
   * Returns the default error message if validation fails.
   *
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsBranchOptions} args.constraints.0 - Validation options
   * @return {string} Default error message
   */
  defaultMessage(args: ValidationArguments): string {
    const { constraints = [] } = args

    // Get decorator constraint name
    const name = IsBranchConstraint.options?.name as string

    return buildMessage(
      prefix => `${prefix}${Msg[constraints[0].context[name].error.code]}`,
      args.constraints[0]
    )()
  }

  /**
   * Checks if `value` is the name of a branch in the current repository.
   *
   * By default, local branches will be listed. To specifiy a remote to pull
   * branches from, set `args.constraints.0.remote`.
   *
   * If validation fails, the arguments context `args.constraints[0].context`,
   * will be modified.
   *
   * @param {any} value - Value to test against constraint
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsBranchOptions} args.constraints.0 - Validation options
   * @param {string} [args.constraints.0.remote] - Name of remote
   * @return {Promise<boolean>} Boolean indicating if value is branch
   */
  async validate(
    value: any,
    args: ValidationArguments = {
      constraints: []
    } as unknown as ValidationArguments
  ): Promise<boolean> {
    // Get decorator constraint name and default args context
    const name = IsBranchConstraint.options?.name as string
    const context = { [name]: { error: {} } }

    // Format validation options
    args.constraints[0] = merge({}, args.constraints[0], { context })

    // Get validation options
    const { remote } = args.constraints[0] as IsBranchOptions

    // Get branches
    const branches = await listBranches({ dir: process.cwd(), fs, remote })

    // Check if value is the name of a branch in the current repo
    if (!branches.filter(branch => branch !== '.DS_Store').includes(value)) {
      const code = remote && remote.length ? 'REMOTE' : 'LOCAL'

      args.constraints[0].context[name].error.code = code
      return false
    }

    // Value is the name of a local or remote branch
    return true
  }
}
