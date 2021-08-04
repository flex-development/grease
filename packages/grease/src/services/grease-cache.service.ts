import type { ObjectPlain } from '@flex-development/tutils'
import type { IGreaseCache, IGreaseOptions } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import type { GitSemverTagsOptions } from '@grease/types'
import validate from '@grease/utils/validate.util'

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
export default class GreaseCache implements IGreaseCache {
  /**
   * @instance
   * @property {IGreaseOptions} options - Application options
   */
  options: IGreaseOptions = {}

  /**
   * @instance
   * @property {boolean} ready - Boolean indicating if cache was initialized
   */
  ready: boolean = false

  /**
   * `GitSemverTagsOptions` object.
   *
   * Primarily used to construct dynamic models based on user options.
   *
   * @return {GitSemverTagsOptions} `git-semver-tags` options
   */
  get git(): GitSemverTagsOptions {
    // If cache hasn't been initialized, return empty object
    if (!this.ready) return {}

    // Return `git-semver-tags` options
    return {
      lernaTags: typeof this.options.lernaPackage === 'string',
      package: this.options.lernaPackage,
      skipUnstable: this.options.skipUnstable,
      tagPrefix: this.options.tagPrefix
    }
  }

  /**
   * Initializes the application cache by validation application options.
   *
   * @async
   * @param {IGreaseOptions | ObjectPlain} [opts={}] - Application options
   * @return {Promise<GreaseOptions>} Promise containing validated options
   * @throws {ValidationException}
   */
  async init(opts: IGreaseOptions | ObjectPlain = {}): Promise<IGreaseOptions> {
    // Validate application options
    this.options = await validate(GreaseOptions, opts)

    // Update cache ready state
    this.ready = true

    // Return validated options
    return this.options
  }
}
