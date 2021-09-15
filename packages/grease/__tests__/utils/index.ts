import TAGS from '@grease/tests/fixtures/git-tags.fixture'
import type { GitSemverTagsOptions } from '@grease/types'
import semver from '@grease/utils/semver.util'

/**
 * @file Test Utilities
 * @module grease/tests/utils
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
