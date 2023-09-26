/**
 * @file Options - GitTagOptions
 * @module grease/git/options/GitTagOptions
 */

import { get } from '@flex-development/tutils'
import { IsBoolean } from 'class-validator'
import GitOptions from './git.options'

/**
 * Git tag retrieval options.
 *
 * @class
 * @extends {GitOptions}
 */
class GitTagOptions extends GitOptions {
  /**
   * Include unstable tags.
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean} unstable
   */
  @IsBoolean()
  public unstable: boolean

  /**
   * Create a new options object.
   *
   * @param {Partial<GitTagOptions>?} [opts] - Git tag options
   */
  constructor(opts?: Partial<GitTagOptions>) {
    super(opts)
    this.unstable = get(opts, 'unstable', true)
  }
}

export default GitTagOptions
