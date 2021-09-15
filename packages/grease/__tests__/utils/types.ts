import type { Testcase } from '@tests/utils/types'

/**
 * @file Test Utilities - Type Definitions
 * @module grease/tests/utils/types
 */

/**
 * Names of custom validation options for the `IsBranch` decorator.
 */
export type IsBranchOption = 'dir' | 'remote'

/**
 * Names of custom validation options for the `IsCommit` decorator.
 */
export type IsCommitOption = 'dir'

/**
 * Names of custom validation options for the `IsPath` decorator.
 */
export type IsPathOption = 'cwd' | 'exists' | 'gh'

/**
 * Names of custom validation options for the `IsSemVer` decorator.
 */
export type IsSemVerOption =
  | 'clean'
  | 'cmp'
  | 'coerce'
  | 'git'
  | 'negit'
  | 'satisfies'

/**
 * Names of custom validation options for the `IsTargetBranch` decorator.
 */
export type IsTargetBranchOption = IsBranchOption | 'sha'

/**
 * Represents a decorator or decorator constraint test case.
 *
 * @template Expected - Type of expected value
 * @template Option - Option names
 */
export interface TestcaseDecorator<
  Expected extends any = any,
  Option extends string | never = never
> extends Testcase<Expected> {
  option: 'no options' | (Option extends never ? never : `options.${Option}`)
}
