/**
 * @file Test Utilities - semtag
 * @module test/utils/semtag
 */

import type { SemanticVersion } from '@flex-development/pkg-types'
import { ifelse, type LiteralUnion } from '@flex-development/tutils'

/**
 * Create a semantic version tag.
 *
 * @param {string} version - Semantic version
 * @param {string?} [prefix=''] - Tag prefix
 * @param {string?} [metadata=''] - Build metadata
 * @return {string} Semantic version tag
 */
const semtag = (
  version: string,
  prefix: string = '',
  metadata: string = ''
): LiteralUnion<SemanticVersion, string> => {
  return `${prefix}${version}${ifelse(metadata, `+${metadata}`, metadata)}`
}

export default semtag
