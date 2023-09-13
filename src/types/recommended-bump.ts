/**
 * @file Type Definitions - RecommendedBump
 * @module grease/types/RecommendedBump
 */

import type { ReleaseType } from '#src/enums'

/**
 * A recommended version bump.
 */
type RecommendedBump = {
  /**
   * Total number of breaking changes committed since last release.
   */
  breaks: number

  /**
   * Recommended release type.
   *
   * @see {@linkcode ReleaseType}
   */
  bump: Extract<ReleaseType, 'major' | 'minor' | 'patch'>

  /**
   * Number of commits considered.
   */
  commits: number

  /**
   * Total number of features committed since last release.
   */
  features: number
}

export type { RecommendedBump as default }
