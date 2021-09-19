import type { SemanticVersion } from './SemanticVersion'

/**
 * @file Type Definitions - PackageFileResult
 * @module grease/types/PackageFileResult
 */

/**
 * Object containing current package version and boolean indicating if package
 * is private or not.
 */
export type PackageFileResult = { isPrivate: boolean; version: SemanticVersion }
