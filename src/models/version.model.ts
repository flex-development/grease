/**
 * @file Models - Version
 * @module grease/models/Version
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import { get, set } from '@flex-development/tutils'
import { SemVer } from 'semver'

/**
 * Semantic version data model.
 *
 * @class
 * @extends {SemVer}
 */
class Version extends SemVer {
  /**
   * Semantic version string.
   *
   * @see https://semver.org
   *
   * @public
   * @override
   * @member {SemanticVersion} version
   */
  declare public version: SemanticVersion

  /**
   * Copy properties from the given semantic version.
   *
   * @public
   *
   * @param {SemVer} ver - Version to copy
   * @return {this} `this` version
   */
  public copy(ver: SemVer): this {
    this.build = ver.build
    this.loose = ver.loose
    this.major = ver.major
    this.minor = ver.minor
    this.options = ver.options
    this.patch = ver.patch
    this.prerelease = ver.prerelease
    this.raw = ver.raw
    set(this, 'includePrerelease', get(ver, 'includePrerelease', false))
    this.format()
    return this
  }

  /**
   * Get a string representation of `this` semantic version.
   *
   * @public
   * @override
   *
   * @return {string} Stringified semantic version
   */
  public override toString(): SemanticVersion {
    return this.version
  }
}

export default Version
