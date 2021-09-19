import type { ObjectPlain } from '@flex-development/tutils'
import defaults from '@grease/config/defaults.config'
import type { ICommitType, IGreaseOptions } from '@grease/interfaces'
import merge from 'lodash.merge'

/**
 * @file Utility - getOptions
 * @module grease/utils/getOptions
 */

/**
 * Merges `args` with the default `grease` options.
 *
 * Searches for a [`prerelease` name][1] in `version`.
 *
 * The function assumes [`prerelease` names][1] are included in project version
 * numbers or release tags (e.g `3.13.98-dev.640` where `dev` is the intended
 * name, or `foo-package@26.0.0-alpha.1` where `alpha` is the intended name).
 *
 * Use `options.prereleaseMap` to interpolate name in cases where the name found
 * is not the name intended (e.g: `v3.13.98-rc.640`).
 *
 * If `options.prerelease` is a string, it'll be returned instead.
 *
 * [1]: https://github.com/conventional-changelog/standard-version/tree/v9.3.1#release-as-a-pre-release
 *
 * @param {IGreaseOptions | ObjectPlain} [args={}] - Application arguments
 * @return {IGreaseOptions} User options merged with defaults
 */
const getOptions = (
  args: IGreaseOptions | ObjectPlain = {}
): IGreaseOptions => {
  return merge({}, defaults, args, {
    // Assume that any commit type without a section property should be hidden
    // See https://github.com/flex-development/grease/issues/26
    types: args.types?.map((t: ICommitType) => ({ ...t, hidden: !t.section }))
  })
}

export default getOptions
