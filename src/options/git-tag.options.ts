/**
 * @file Options - GitTagOptions
 * @module grease/options/GitTagOptions
 */

import { get } from '@flex-development/tutils'
import { IsBoolean, IsString } from 'class-validator'
import GitOptions from './git.options'

/**
 * Git tag retrieval options.
 *
 * @class
 * @extends {GitOptions}
 */
class GitTagOptions extends GitOptions {
  /**
   * Tag prefix to consider when validating tags.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} tagprefix
   */
  @IsString()
  public tagprefix: string

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
    this.tagprefix = get(opts, 'tagprefix', '')
    this.unstable = get(opts, 'unstable', true)
  }
}

export default GitTagOptions
