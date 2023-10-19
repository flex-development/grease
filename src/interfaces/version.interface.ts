/**
 * @file Interfaces - IVersion
 * @module grease/interfaces/IVersion
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import type { NumberString } from '@flex-development/tutils'

/**
 * A semantic version object.
 */
interface IVersion {
  /**
   * Build metadata.
   *
   * @example
   *  ['067c93cc68575a652d8609585bd64478c38dccfe']
   */
  build: readonly string[]

  /**
   * Major version number.
   */
  major: number

  /**
   * Major version number.
   *
   * @example
   *  0
   */
  minor: number

  /**
   * Major version number.
   *
   * @example
   *  0
   */
  patch: number

  /**
   * Prerelease components.
   *
   * @example
   *  ['alpha', 1]
   */
  prerelease: readonly NumberString[]

  /**
   * Semantic version string.
   *
   * @example
   *  '3.0.0-alpha.1+067c93cc68575a652d8609585bd64478c38dccfe'
   */
  version: SemanticVersion
}

export type { IVersion as default }
