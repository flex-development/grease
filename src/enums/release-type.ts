/**
 * @file Enums - ReleaseType
 * @module grease/enums/ReleaseType
 */

import type semver from 'semver'

/**
 * Release types.
 *
 * @enum {semver.ReleaseType}
 */
enum ReleaseType {
  MAJOR = 'major',
  MINOR = 'minor',
  PATCH = 'patch',
  PREMAJOR = 'premajor',
  PREMINOR = 'preminor',
  PREPATCH = 'prepatch',
  PRERELEASE = 'prerelease'
}

export default ReleaseType
