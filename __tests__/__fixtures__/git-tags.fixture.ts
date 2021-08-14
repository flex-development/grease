import type {
  GitSemverTagsOptions,
  SemanticVersion,
  SemanticVersionTag
} from '@grease/types'

/**
 * @file Global Fixture - Git Semver Tags
 * @module tests/fixtures/git-tags
 */

export const TAGS_OPTIONS_LERNA: GitSemverTagsOptions = {
  lernaTags: true,
  package: 'foo-package',
  skipUnstable: false,
  tagPrefix: 'foo-package@'
}

export const VERSION: SemanticVersion = '3.13.98-rc.6.40'
export const VERSION_DEV = VERSION.replace('rc', 'dev') as SemanticVersion
export const VERSION_TAG: SemanticVersionTag = `v${VERSION}`
export const VERSION_TAG_DEV: SemanticVersionTag = `v${VERSION_DEV}`

export default [
  'v5.1.1',
  'v5.1.0',
  'v5.0.0',
  'v4.3.1-rc',
  'v4.2.3',
  'v4.0.0',
  VERSION_TAG,
  'v3.0.0',
  'v2.1.0',
  'v2.0.0',
  'v1.1.0-alpha.1',
  'v1.0.0'
] as SemanticVersionTag[]
