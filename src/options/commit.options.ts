/**
 * @file Options - CommitOptions
 * @module grease/options/CommitOptions
 */

import { get } from '@flex-development/tutils'
import { IsArray, IsString } from 'class-validator'
import GitOptions from './git.options'

/**
 * Commit retrieval and parsing options.
 *
 * @class
 * @extends {GitOptions}
 */
class CommitOptions extends GitOptions {
  /**
   * Revision range start.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} from
   */
  @IsString()
  public from: string

  /**
   * Issue reference prefixes.
   *
   * @default ['#','gh-']
   *
   * @public
   * @instance
   * @member {string[]} issue_prefixes
   */
  @IsArray()
  @IsString({ each: true })
  public issue_prefixes: string[]

  /**
   * Revision range end.
   *
   * @default 'HEAD'
   *
   * @public
   * @instance
   * @member {string} to
   */
  @IsString()
  public to: string

  /**
   * Create a new options object.
   *
   * @param {Partial<CommitOptions>?} [opts] - Commit options
   */
  constructor(opts?: Partial<CommitOptions>) {
    super(opts)
    this.from = get(opts, 'from', '')
    this.issue_prefixes = get(opts, 'issue_prefixes', ['#', 'gh-'])
    this.to = get(opts, 'to', 'HEAD')
  }
}

export default CommitOptions
