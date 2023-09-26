/**
 * @file Queries - BumpQuery
 * @module grease/bump/BumpQuery
 */

import { GitOptions } from '#src/git'
import { get, type Partial } from '@flex-development/tutils'
import { IsString } from 'class-validator'

/**
 * Recommended version bump query.
 *
 * @see {@linkcode GitOptions}
 *
 * @class
 * @extends {GitOptions}
 */
class BumpQuery extends GitOptions {
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
   * Create a new bump query.
   *
   * @param {Partial<BumpQuery>} [params] - Query parameters
   */
  constructor(params?: Partial<BumpQuery>) {
    super(params)
    this.to = get(params, 'to', 'HEAD')
  }
}

export default BumpQuery
