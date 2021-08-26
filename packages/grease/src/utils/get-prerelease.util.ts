import dtag from '@flex-development/dtag'
import defaults from '@grease/config/defaults.config'
import type { IGreaseOptions } from '@grease/interfaces'

/**
 * @file Utility - getPrerelease
 * @module grease/utils/getPrerelease
 */

/**
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
 * @param {IGreaseOptions} [options=defaults] - Application options
 * @param {string} [options.prerelease] - Custom prerelease tag
 * @param {string} [options.prereleaseDelimiter='-'] - Prerelease delimiter
 * @param {Record<string,string>} [options.prereleaseMap={}] - Dist tag map
 * @param {boolean} [options.prereleaseSkip] - Skip distribution tag lookup
 * @param {string} [options.tagPrefix='v'] - Git tag prefix
 * @param {any} [version=null] - Project version
 * @return {string | undefined} `prerelease` tag or `undefined`
 */
const getPrerelease = (
  options: IGreaseOptions = defaults,
  version: any = null
): string | undefined => {
  // Return `prerelease` if custom value is set
  if (typeof options.prerelease === 'string') return options.prerelease

  // Get prerelease tag
  return dtag({
    delimiter: options.prereleaseDelimiter,
    map: Object.fromEntries(options.prereleaseMap?.entries() ?? []),
    skip: options.prereleaseSkip,
    tagPrefix: options.tagPrefix,
    version
  })
}

export default getPrerelease
