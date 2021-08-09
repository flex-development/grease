import type { Options as StandardVersionOptions } from 'standard-version'
import type { SemanticVersion } from './semver.types'

/**
 * @file Type Definitions - standard-version
 * @module grease/types/standard-version
 * @see https://github.com/conventional-changelog/standard-version
 */

/**
 * Object containing current package version and boolean indicating if package
 * is private or not.
 */
export type PackageFileResult = { isPrivate: boolean; version: SemanticVersion }

/**
 * A resolved updater.
 */
export type Updater = {
  filename: string
  updater?: UpdaterCustom | UpdaterJSON
}

/**
 * Custom updater used for reading `packageFiles` and writing to `bumpFiles`.
 */
export type UpdaterCustom = {
  /**
   * Reads the package version from the provided file `contents`.
   *
   * @param {string} contents - File content
   * @return {SemanticVersion} Package version (a valid semantic version string)
   */
  readVersion(contents: string): SemanticVersion

  /**
   * Writes `version` to `contents`.
   *
   * @param {string} contents - File content
   * @param {SemanticVersion} version - Package version
   * @return {string} New file content
   */
  writeVersion(contents: string, version: SemanticVersion): string
}

/**
 * Updates `.json` files.
 */
export type UpdaterJSON = UpdaterCustom & {
  /**
   * Returns a boolean indicating if the package is private or not.
   *
   * @param {string} contents - File content
   * @return {boolean} `true` if private, `false` otherwise
   */
  isPrivate(contents: string): boolean
}

/**
 * Object used to resolve updaters.
 */
export type UpdaterResolver = {
  filename?: Updater['filename']
  type?: 'json' | 'plain-text'
  updater?: UpdaterCustom | string
}

export { StandardVersionOptions }
