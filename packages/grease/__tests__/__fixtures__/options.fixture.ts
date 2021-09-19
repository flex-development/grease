import type { IGreaseOptions } from '@grease/interfaces'
import { TAGS_OPTIONS_LERNA } from './git-tags.fixture'
import TYPES from './types.fixture'

/**
 * @file Workspace Test Fixture - IGreaseOptions
 * @module grease/tests/fixtures/options
 */

export default {
  lernaPackage: TAGS_OPTIONS_LERNA.package,
  skipUnstable: TAGS_OPTIONS_LERNA.skipUnstable,
  tagPrefix: TAGS_OPTIONS_LERNA.tagPrefix,
  types: TYPES
} as IGreaseOptions
