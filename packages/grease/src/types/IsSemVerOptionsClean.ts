import type { Options as SemVerOptions } from 'semver'

/**
 * @file Type Definitions - IsSemVerOptionsClean
 * @module grease/types/IsSemVerOptionsClean
 */

/**
 * `IsSemVerOptions.clean` configuration.
 */
export type IsSemVerOptionsClean = [string] | [string, SemVerOptions] | []
