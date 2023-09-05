/**
 * @file Type Definitions - ReleaseVersion
 * @module grease/types/ReleaseVersion
 */

import type { ReleaseType } from '#src/enums'
import type { SemanticVersion } from '@flex-development/pkg-types'
import type semver from 'semver'

/**
 * A release type or semantic version.
 *
 * @see {@linkcode ReleaseType}
 * @see {@linkcode SemanticVersion}
 * @see {@linkcode semver.ReleaseType}
 */
type ReleaseVersion = ReleaseType | SemanticVersion | semver.ReleaseType

export type { ReleaseVersion as default }
