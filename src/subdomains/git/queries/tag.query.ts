/**
 * @file Queries - TagQuery
 * @module grease/git/queries/TagQuery
 */

import { GitOptions } from '#src/git/options'
import { get, sift, type Partial } from '@flex-development/tutils'
import { IsArray, IsString, MinLength } from 'class-validator'

/**
 * Git tags query.
 *
 * @see {@linkcode GitOptions}
 * @see https://git-scm.com/docs/git-tag
 *
 * @class
 * @extends {GitOptions}
 */
class TagQuery extends GitOptions {
  /**
   * Sorting configuration.
   *
   * @see https://git-scm.com/docs/git-tag#Documentation/git-tag.txt---sortltkeygt
   *
   * @default ['-creatordate']
   *
   * @public
   * @instance
   * @member {string[]} to
   */
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @IsArray()
  public sort: string[]

  /**
   * Create a new release tags query.
   *
   * @param {Partial<TagQuery>} [params] - Query parameters
   */
  constructor(params?: Partial<TagQuery>) {
    super(params)
    this.sort = sift(get(params, 'sort', ['-creatordate']))
  }
}

export default TagQuery
