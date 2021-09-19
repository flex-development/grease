import type { SemanticVersion } from './SemanticVersion'

/**
 * @file Type Definitions - UpdaterCustom
 * @module grease/types/UpdaterCustom
 */

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
