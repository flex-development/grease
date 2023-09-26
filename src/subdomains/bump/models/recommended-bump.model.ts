/**
 * @file Models - RecommendedBump
 * @module grease/bump/models/RecommendedBump
 */

import { ReleaseType } from '#src/enums'
import { ifelse, type Omit } from '@flex-development/tutils'

/**
 * Recommended version bump.
 *
 * @class
 */
class RecommendedBump {
  /**
   * Total number of breaking changes committed since last release.
   *
   * @public
   * @instance
   * @member {number} breaks
   */
  public breaks: number

  /**
   * Recommended release type.
   *
   * @see {@linkcode ReleaseType}
   *
   * @public
   * @instance
   * @member {Extract<ReleaseType, 'major' | 'minor' | 'patch'>} bump
   */
  public bump: Extract<ReleaseType, 'major' | 'minor' | 'patch'>

  /**
   * Number of commits considered.
   *
   * @public
   * @instance
   * @member {number} commits
   */
  public commits: number

  /**
   * Total number of features committed since last release.
   *
   * @public
   * @instance
   * @member {number} features
   */
  public features: number

  /**
   * Create a new version bump recommendation.
   *
   * @param {Omit<RecommendedBump, 'bump'>} data - Version bump data
   */
  constructor(data: Omit<RecommendedBump, 'bump'>) {
    this.breaks = data.breaks
    this.commits = data.commits
    this.features = data.features
    this.bump = ifelse(
      this.breaks,
      ReleaseType.MAJOR,
      ifelse(this.features, ReleaseType.MINOR, ReleaseType.PATCH)
    )
  }
}

export default RecommendedBump
