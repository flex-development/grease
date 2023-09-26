/**
 * @file Models - Version
 * @module grease/models/Version
 */

import { ReleaseType } from '#src/enums'
import type { ReleaseVersion } from '#src/types'
import type { SemanticVersion } from '@flex-development/pkg-types'
import { cast, type Optional } from '@flex-development/tutils'
import semver, { SemVer } from 'semver'

/**
 * Semantic version data model.
 *
 * @see {@linkcode SemVer}
 *
 * @class
 * @extends {SemVer}
 */
class Version extends SemVer {
  /**
   * Semantic version string.
   *
   * @see {@linkcode SemanticVersion}
   *
   * @public
   * @override
   * @member {SemanticVersion} version
   */
  public override version: SemanticVersion

  /**
   * Create a new semantic version.
   *
   * @see {@linkcode SemVer}
   *
   * @param {SemVer | string} version - Semantic version instance or string
   */
  constructor(version: SemVer | string) {
    super(version, { includePrerelease: true, loose: false })
    this.version = cast(version.toString())
  }

  /**
   * Copy properties from the given semantic version.
   *
   * Range options will **not** be copied.
   *
   * @public
   *
   * @param {SemVer} version - Version to copy
   * @return {this} `this` version
   */
  public copy(version: SemVer): this {
    this.build = version.build
    this.major = version.major
    this.minor = version.minor
    this.patch = version.patch
    this.prerelease = version.prerelease
    this.raw = version.raw
    this.format()
    return this
  }

  /**
   * Bump `this` version.
   *
   * @see {@linkcode ReleaseVersion}
   *
   * @public
   * @override
   *
   * @param {ReleaseVersion} release - Release version or type
   * @param {Optional<string>?} preid - Prerelease identifier
   * @param {number?} prestart - Prerelease start range
   * @return {this} `this` version
   */
  public override inc(
    release: ReleaseVersion,
    preid: Optional<string> = undefined,
    prestart: number = 1
  ): this {
    /**
     * New version.
     *
     * @var {SemVer} version
     */
    let version: SemVer = new SemVer(this.version)

    // bump version
    switch (true) {
      case release === ReleaseType.MAJOR:
      case release === ReleaseType.MINOR:
      case release === ReleaseType.PATCH:
      case release === ReleaseType.PREMAJOR:
      case release === ReleaseType.PREMINOR:
      case release === ReleaseType.PREPATCH:
      case release === ReleaseType.PRERELEASE:
        // @ts-expect-error ts(2554) types are wrong
        version.inc(cast(release), preid, prestart)
        break
      case !!semver.valid(release):
        version = new SemVer(release)
        break
      default:
        throw new Error(`invalid increment argument: ${release}`, {
          cause: { release }
        })
    }

    return this.copy(version)
  }

  /**
   * Get a string representation of `this` semantic version.
   *
   * @see {@linkcode SemanticVersion}
   *
   * @public
   * @override
   *
   * @return {SemanticVersion} Stringified semantic version
   */
  public override toString(): SemanticVersion {
    return this.version
  }
}

export default Version
