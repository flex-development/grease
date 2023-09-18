/**
 * @file Options - GitOptions
 * @module grease/options/GitOptions
 */

import { IsDirectory } from '#src/decorators'
import { DOT, defaults, fallback, ifelse } from '@flex-development/tutils'
import { IsBoolean } from 'class-validator'

/**
 * Git options.
 *
 * @class
 */
class GitOptions {
  /**
   * Path to current working directory.
   *
   * @default process.cwd()
   *
   * @public
   * @instance
   * @member {string} cwd
   */
  @IsDirectory()
  public cwd: string

  /**
   * Enable verbose output.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} debug
   */
  @IsBoolean()
  public debug: boolean

  /**
   * Create a new options object.
   *
   * @param {Partial<GitOptions>?} [opts] - Git options
   */
  constructor(opts?: Partial<GitOptions>) {
    const { cwd, debug } = defaults(fallback(opts, {}), {
      cwd: process.cwd(),
      debug: false
    })

    this.cwd = ifelse(cwd === DOT, process.cwd(), cwd)
    this.debug = debug
  }
}

export default GitOptions
