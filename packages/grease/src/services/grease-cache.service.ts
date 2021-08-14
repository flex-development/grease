import TOKENS from '@grease/config/tokens.config'
import type { IGreaseCache, IGreaseOptions } from '@grease/interfaces'
import type { GitSemverTagsOptions } from '@grease/types'
import { Service } from 'typedi'

/**
 * @file Services - GreaseCache
 * @module grease/services/GreaseCache
 */

/**
 * `grease` application cache service.
 *
 * @class
 * @implements {IGreaseCache}
 */
@Service({ global: true, id: TOKENS.GreaseCache, type: GreaseCache })
export default class GreaseCache implements IGreaseCache {
  /**
   * @instance
   * @property {IGreaseOptions} options - Application options
   */
  options: IGreaseOptions = {}

  /**
   * `GitSemverTagsOptions` object.
   *
   * Primarily used to construct dynamic models based on user options.
   *
   * @return {GitSemverTagsOptions} `git-semver-tags` options
   */
  get git(): GitSemverTagsOptions {
    if (!Object.keys(this.options).length) return {}

    return {
      lernaTags: typeof this.options.lernaPackage === 'string',
      package: this.options.lernaPackage,
      skipUnstable: this.options.skipUnstable,
      tagPrefix: this.options.tagPrefix
    }
  }
}
