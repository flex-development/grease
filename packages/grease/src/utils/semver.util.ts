import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type {
  GitSemverTagsOptions,
  SemanticVersion,
  SemanticVersionTag,
  SemVerOptions
} from '@grease/types'
import gitSemverTags from 'git-semver-tags'
import cmp from 'semver/functions/cmp'
import coerce from 'semver/functions/coerce'
import compare from 'semver/functions/compare'
import parse from 'semver/functions/parse'
import rcompare from 'semver/functions/rcompare'
import satisfies from 'semver/functions/satisfies'
import valid from 'semver/functions/valid'

/**
 * @file Utilities - semver
 * @module grease/utils/semver
 * @see https://github.com/npm/node-semver#usage
 * @see https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-semver-tags
 */

export default {
  /**
   * Cleans and parses `version`.
   *
   * Removes tag prefixes, as well as leading and trailing whitespaces. If the
   * version is invalid, `null` will be returned instead.
   *
   * @param {any} version - Value to clean
   * @param {string} [tagPrefix] - Tag prefix to ignore. Defaults to `v`
   * @param {SemVerOptions} [options] - semver options
   * @return {SemanticVersion | null} Semantic version or `null`
   */
  clean(
    version: any,
    tagPrefix: string = 'v',
    options?: SemVerOptions
  ): SemanticVersion | null {
    const stripped = (`${version}`.split(tagPrefix)[1] || version).toString()
    const cleaned = parse(stripped?.trim() ?? stripped, options)

    return (cleaned?.version as SemanticVersion) ?? null
  },

  cmp,
  coerce,
  compare,
  rcompare,
  satisfies,

  /**
   * Returns an array of Git semver tags in reverse chronological order.
   *
   * @param {GitSemverTagsOptions} [options] - Options
   * @param {boolean} [options.lernaTags] - Extract Lerna style tags (e.g:
   * `foo-package@2.0.0`) from the Git history, rather than `v1.0.0` format
   * @param {string} [options.package] - Name of package using lerna style tags
   * @param {string} [options.tagPrefix] - Specify version tag prefix to ignore
   * @param {boolean} [options.skipUnstable] - Skip unstable tags (e.g:
   * `x.x.x-alpha.1`, `x.x.x-rc.2`)
   * @param {boolean} [reverse] - If `false`, return tags in ascending order
   * @return {Promise<SemanticVersionTag[]>} - Promise containing tags
   * @throws {Exception}
   */
  tags(
    options: GitSemverTagsOptions = {},
    reverse: boolean = true
  ): Promise<SemanticVersionTag[]> {
    return new Promise((resolve, reject) => {
      gitSemverTags(options, (error: Error, tags: string[]): void => {
        if (error) {
          const code = ExceptionStatusCode.BAD_REQUEST
          const data = { options, reverse }

          return reject(new Exception(code, error.message, data, error.stack))
        }

        // If no tags, don't bother doing anything else
        if (!tags.length) return resolve(tags as SemanticVersionTag[])

        // Get options
        const { package: package_name, lernaTags } = options
        const tagPrefix = lernaTags ? `${package_name}@` : 'v'

        // Ensure that the largest or smallest semver tag is at the head
        tags.sort((tag1, tag2) => {
          const version1 = lernaTags ? tag1.split(tagPrefix)[1] || tag1 : tag1
          const version2 = lernaTags ? tag2.split(tagPrefix)[1] || tag2 : tag2

          try {
            return (reverse ? rcompare : compare)(version1, version2)
          } catch ({ message, stack }) {
            const code = ExceptionStatusCode.BAD_REQUEST
            const data = { tag1, tag2, tagPrefix, version1, version2 }

            throw new Exception(code, message, data, stack)
          }
        })

        return resolve(tags as SemanticVersionTag[])
      })
    })
  },

  valid
}
