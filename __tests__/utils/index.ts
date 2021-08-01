import type { GitSemverTagsOptions } from '@grease/types'
import semver from '@grease/utils/semver'
import TAGS from '@tests/fixtures/git-tags.fixture'

/**
 * @file Test Utilities
 * @module tests/utils
 */

/**
 * Returns an array of mock Git tags.
 *
 * @param {GitSemverTagsOptions} [opts] - Tag options
 * @param {boolean} [opts.lernaTags] - Extract Lerna style tags
 * @param {string} [opts.package] - Name of package using lerna style tags
 * @return {string[]} Array of mock tags
 * @throws {Error}
 */
export const mockGitTags = (opts: GitSemverTagsOptions = {}): string[] => {
  const { lernaTags, package: pkg } = opts

  if (pkg && !lernaTags) {
    const msg = 'opts.package should only be used when running in lerna mode'
    throw new Error(msg)
  }

  if (!lernaTags) return Object.assign([], TAGS)
  return TAGS.map(tag => `${pkg}@${semver.clean(tag)}`)
}

/**
 * Compares two string values.
 *
 * @param {string} string1 - First string to compare
 * @param {string} string2 - Second string to compare
 * @param {'asc' | 'desc'} [type] - Sort type
 * @return {number} Comparison result, `-1 | 0 | 1`
 */
export const stringCompare = (
  string1: string,
  string2: string,
  type: 'asc' | 'desc' = 'asc'
): -1 | 0 | 1 => {
  const ascending = type === 'asc'

  if (string1 < string2) return ascending ? -1 : 1
  if (string1 > string2) return ascending ? 1 : -1

  return 0
}

/**
 * Returns the `typeof value`. If `value` is a object, the constructor name will
 * be returned.
 *
 * @param {any} value - Value to stringify type
 * @return {string} Value type as string
 */
export const stringifyType = (value: any): string => {
  const obj = typeof value === 'object' && (value?.constructor ?? false)
  return `${obj ? value.constructor.name : typeof value}`
}
