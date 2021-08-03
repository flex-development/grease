import type {
  GitSemverTagsCallback as Callback,
  GitSemverTagsOptions as Options
} from '@grease/types'
import semver from '@grease/utils/semver'
import { mockGitTags } from '@tests/utils'

/**
 * @file Node Module Mock - git-semver-tags
 * @module mocks/git-semver-tags
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-semver-tags
 */

export default (opts: Options, callback: Callback): void => {
  const { lernaTags, package: pkg, skipUnstable, tagPrefix } = opts

  if (pkg && !lernaTags) {
    const msg = 'opts.package should only be used when running in lerna mode'

    callback(new Error(msg), [])
    return
  }

  const isLernaTag = (tag: string, pkg?: string): boolean => {
    if (pkg && !new RegExp('^' + pkg + '@').test(tag)) return false
    return /^.+@[0-9]+\.[0-9]+\.[0-9]+(-.+)?$/.test(tag)
  }

  const tags: string[] = []
  const unstableTagTest = /.+-\w+\.\d+$/

  mockGitTags(opts).forEach(tag => {
    if (skipUnstable && unstableTagTest.test(tag)) return

    if (lernaTags && isLernaTag(tag, pkg)) {
      tags.push(tag)
    } else if (tagPrefix) {
      const matches = tag.match(new RegExp(`^${tagPrefix}(.*)`))

      if (matches && semver.valid(matches[1])) tags.push(tag)
    } else if (semver.valid(tag)) {
      tags.push(tag)
    }
  })

  callback(null, tags)
}
