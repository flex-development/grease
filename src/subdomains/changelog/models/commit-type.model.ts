/**
 * @file Models - CommitType
 * @module grease/changelog/models/CommitType
 */

import type { ICommitType } from '#src/changelog/interfaces'
import { get, isEmptyString } from '@flex-development/tutils'
import { IsBoolean, IsString } from 'class-validator'

/**
 * An explicitly supported commit message type.
 *
 * @see {@linkcode ICommitType}
 *
 * @class
 * @implements {ICommitType}
 */
class CommitType implements ICommitType {
  /**
   * Remove commit type from changelog.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} hidden
   */
  @IsBoolean()
  public hidden: boolean

  /**
   * Commit group title.
   *
   * @default type
   *
   * @public
   * @instance
   * @member {string} section
   */
  @IsString()
  public section: string

  /**
   * Commit type.
   *
   * @public
   * @instance
   * @member {string} type
   */
  @IsString()
  public type: string

  /**
   * Create a new commit type.
   *
   * @see {@linkcode ICommitType}
   *
   * @param {ICommitType} data - Commit type data
   */
  constructor(data: ICommitType) {
    this.type = get(data, 'type')
    this.section = get(data, 'section', this.type)
    this.hidden = get(data, 'hidden', isEmptyString(this.section))
  }
}

export default CommitType
