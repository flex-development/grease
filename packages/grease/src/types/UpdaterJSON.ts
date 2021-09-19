import type { UpdaterCustom } from './UpdaterCustom'

/**
 * @file Type Definitions - UpdaterJSON
 * @module grease/types/UpdaterJSON
 */

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
