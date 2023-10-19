/**
 * @file Queries - BumpQuery
 * @module grease/bump/queries/BumpQuery
 */

import { GitOptions } from '#src/git'
import { get, type Partial } from '@flex-development/tutils'
import { IsBoolean, IsString } from 'class-validator'

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
   * Prerelease recommendation?
   *
   * @default false
   *
   * @public
   * @override
   * @instance
   * @member {boolean} unstable
   */
  @IsBoolean()
  public override unstable: boolean

  /**
   * Create a new bump query.
   *
   * @param {Partial<BumpQuery>} [params] - Query parameters
   */
  constructor(params?: Partial<BumpQuery>) {
    super(params)
    this.to = get(params, 'to', 'HEAD')
    this.unstable = get(params, 'unstable', false)
  }
}

export default BumpQuery
