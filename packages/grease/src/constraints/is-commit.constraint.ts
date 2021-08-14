import { IsCommitMessage as Msg } from '@grease/enums/is-commit-message.enum'
import type { IsCommitOptions } from '@grease/interfaces'
import type { IConstraint, ValidatorConstraintOptions } from '@grease/types'
import type { ValidationArguments } from 'class-validator'
import {
  buildMessage,
  ValidatorConstraint as Constraint
} from 'class-validator'
import fs from 'fs'
import { readCommit } from 'isomorphic-git'

/**
 * @file Decorator Constraints - IsCommitConstraint
 * @module grease/constraints/IsCommit
 */

/**
 * Custom validator for the `IsCommit` decorator.
 *
 * @implements {IConstraint}
 */
@Constraint(IsCommitConstraint.options)
export default class IsCommitConstraint implements IConstraint {
  /**
   * @static
   * @readonly
   * @property {ValidatorConstraintOptions} options - Custom constraint options
   */
  static readonly options: ValidatorConstraintOptions = {
    async: true,
    name: 'isCommit'
  }

  /**
   * Returns the default error message if validation fails.
   *
   * @param {ValidationArguments} args - Message builder arguments
   * @param {any[]} args.constraints - Validator constraints
   * @param {IsCommitOptions} args.constraints.0 - Validation options
   * @return {string} Default error message
   */
  defaultMessage(args: ValidationArguments): string {
    return buildMessage(
      prefix => `${prefix}${Msg.DOES_NOT_EXIST}`,
      args.constraints[0]
    )()
  }

  /**
   * Checks if `value` is a commit in the current repository.
   *
   * @param {any} value - Value to test against constraint
   * @param {ValidationArguments} args - Message builder arguments
   * @param {string} [args.constraints.0.dir=process.env.PROJECT_CWD] - `.git` directory
   * @return {Promise<boolean>} Boolean indicating if value is commit
   */
  async validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args: ValidationArguments = {} as ValidationArguments
  ): Promise<boolean> {
    // Get validation options
    const options = (args.constraints[0] || {}) as IsCommitOptions
    const { dir = process.env.PROJECT_CWD } = options

    try {
      await readCommit({ dir, fs, oid: value })
    } catch (error) {
      return false
    }

    return true
  }
}
