/**
 * @file Interfaces - IRecommendedBump
 * @module grease/bump/interfaces/IRecommendedBump
 */

import type { ReleaseType } from '#src/enums'

/**
 * A recommended version bump object.
 */
interface IRecommendedBump {
  /**
   * Total number of breaking changes committed since last release.
   */
  breaks: number

  /**
   * Recommended release type.
   *
   * @see {@linkcode ReleaseType}
   */
  bump: Exclude<ReleaseType, 'prerelease'>

  /**
   * Number of commits considered.
   */
  commits: number

  /**
   * Total number of features committed since last release.
   */
  features: number

  /**
   * Prerelease recommendation?
   */
  unstable: boolean
}

export type { IRecommendedBump as default }
