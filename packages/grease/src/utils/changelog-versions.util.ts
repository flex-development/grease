import type { NullishString } from '@flex-development/tutils'
import { RELEASE_PATTERN } from '@grease/config/constants.config'
import semver from '@grease/utils/semver.util'

/**
 * @file Utility - changelogVersions
 * @module grease/utils/changelogVersions
 */

/**
 * Returns an array of package versions in reverse-order. Versions are pulled
 * from headings in `changelog`, a string representing a `CHANGELOG` file in
 * Markdown format. Headings are assumed to be level two or three. Links are
 * supported (e.g: `## x.x.x`, `### [x.x.x](url)`).
 *
 * @param {NullishString} [changelog] - `CHANGELOG` content
 * @return {string[]} Package versions pulled from headings
 */
const changelogVersions = (changelog: NullishString = null): string[] => {
  // If no content, or empty string, do nothing
  if (!changelog || !changelog.trim().length) return []

  // Match changelog content against heading pattern
  const headings = changelog.match(RELEASE_PATTERN)

  // If no headings, do nothing
  if (!headings) return []

  /**
   * Removes `#` and `[` from `s`.
   *
   * @param {string} s - String to sanitize
   * @return {string} Sanitized string
   */
  const strip = (s: string): string => s.replaceAll('#', '').replaceAll('[', '')

  // Get array of versions pulled from headings
  let versions = headings.map(heading => semver.clean(strip(heading)))

  // Filter out null values
  versions = versions.filter(version => typeof version === 'string')

  // Sort versions in descending order
  return (versions as string[]).sort(semver.rcompare)
}

export default changelogVersions
