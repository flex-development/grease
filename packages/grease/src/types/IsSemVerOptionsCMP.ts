import type {
  Operator as SemVerOperator,
  Options as SemVerOptions
} from 'semver'
import type { SemanticVersion } from './SemanticVersion'

/**
 * @file Type Definitions - IsSemVerOptionsCMP
 * @module grease/types/IsSemVerOptionsCMP
 */

/**
 * `IsSemVerOptions.cmp` configuration.
 */
export type IsSemVerOptionsCMP =
  | [SemVerOperator, SemanticVersion]
  | [SemVerOperator, SemanticVersion, SemVerOptions | boolean | undefined]
