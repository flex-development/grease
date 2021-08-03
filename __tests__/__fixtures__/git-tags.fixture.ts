import type { GitSemverTagsOptions } from '@grease/types'

/**
 * @file Global Fixture - Git Semver Tags
 * @module tests/fixtures/git-tags
 */

export const OPTIONS_LERNA: GitSemverTagsOptions = {
  lernaTags: true,
  package: 'foo-package'
}

export default [
  'v5.1.1',
  'v5.1.0',
  'v5.0.0',
  'v4.3.1-rc',
  'v4.2.3',
  'v4.0.0',
  'v3.0.0',
  'v2.1.0',
  'v2.0.0',
  'v1.1.0-alpha.1',
  'v1.0.0'
]
