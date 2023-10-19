/**
 * @file Models - RecommendedBump
 * @module grease/bump/models/RecommendedBump
 */

import type { IRecommendedBump } from '#src/bump/interfaces'
import { ReleaseType } from '#src/enums'
import {
  ifelse,
  type Omit,
  type Simplify
} from '@flex-development/tutils'

/**
 * Recommended version bump data model.
 *
 * @see {@linkcode IRecommendedBump}
 *
 * @class
 * @implements {IRecommendedBump}
 */
class RecommendedBump implements IRecommendedBump {
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
   * @member {Exclude<ReleaseType, 'prerelease'>} bump
   */
  public bump: Exclude<ReleaseType, 'prerelease'>

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
   * Prerelease recommendation?
   *
   * @public
   * @instance
   * @member {boolean} unstable
   */
  public unstable: boolean

  /**
   * Create a new version bump recommendation.
   *
   * @see {@linkcode IRecommendedBump}
   *
   * @param {Omit<IRecommendedBump, 'bump'>} data - Version bump data
   */
  constructor(data: Omit<IRecommendedBump, 'bump'>) {
    this.breaks = data.breaks
    this.commits = data.commits
    this.features = data.features
    this.unstable = data.unstable

    switch (true) {
      case this.breaks > 0:
        this.bump = ReleaseType[ifelse(this.unstable, 'PREMAJOR', 'MAJOR')]
        break
      case this.features > 0:
        this.bump = ReleaseType[ifelse(this.unstable, 'PREMINOR', 'MINOR')]
        break
      default:
        this.bump = ReleaseType[ifelse(this.unstable, 'PREPATCH', 'PATCH')]
        break
    }
  }

  /**
   * Get a JSON-serializable recommendation.
   *
   * @public
   *
   * @return {Simplify<IRecommendedBump>} JSON-serializable recommendation
   */
  public toJSON(): Simplify<IRecommendedBump> {
    return {
      breaks: this.breaks,
      bump: this.bump,
      commits: this.commits,
      features: this.features,
      unstable: this.unstable
    }
  }
}

export default RecommendedBump
