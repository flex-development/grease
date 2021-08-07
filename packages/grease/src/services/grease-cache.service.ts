import type { ObjectPlain } from '@flex-development/tutils'
import type { IGreaseCache, IGreaseOptions } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import type { GitSemverTagsOptions } from '@grease/types'
import validateSync from '@grease/utils/validate-sync.util'
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
@Service()
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

  /**
   * Caches application options after validating.
   *
   * @param {IGreaseOptions | ObjectPlain} [args={}] - Application options
   * @throws {ValidationException}
   */
  set args(args: IGreaseOptions | ObjectPlain) {
    this.options = validateSync<IGreaseOptions>(GreaseOptions, args)
  }
}
