/**
 * @file Queries - CommitQuery
 * @module grease/git/queries/CommitQuery
 */

import { IsConstructor } from '#src/decorators'
import { Commit } from '#src/git/models'
import { GitOptions } from '#src/git/options'
import type { CommitConstructor } from '#src/git/types'
import {
  get,
  isArray,
  isString,
  select,
  type Constructor,
  type Partial
} from '@flex-development/tutils'
import { IsArray, IsString, MinLength } from 'class-validator'

/**
 * Git commits query.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode GitOptions}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {GitOptions}
 */
class CommitQuery<T extends Commit = Commit> extends GitOptions {
  /**
   * Parsed commit class.
   *
   * @default Commit
   *
   * @public
   * @instance
   * @member {CommitConstructor<T>} Commit
   */
  @IsConstructor()
  public Commit: CommitConstructor<T>

  /**
   * Reference action keywords.
   *
   * @default
   *  based on repository provider
   *
   * @public
   * @instance
   * @member {string[]} actions
   */
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  public actions: string[]

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
   * @default
   *  based on repository provider
   *
   * @public
   * @instance
   * @member {string[]} issues
   */
  @IsArray()
  @IsString({ each: true })
  public issues: string[]

  /**
   * Pull request reference prefixes.
   *
   * @default
   *  based on repository provider
   *
   * @public
   * @instance
   * @member {string[]} pr
   */
  @IsArray()
  @IsString({ each: true })
  public pr: string[]

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
   * @param {Partial<CommitQuery<T>>?} [opts] - Git commit options
   */
  constructor(opts?: Partial<CommitQuery<T>>) {
    super(opts)

    this.Commit = get(opts, 'Commit', <Constructor<T>>Commit)
    this.actions = <string[]>get(opts, 'actions', [])
    this.from = get(opts, 'from', '')
    this.issues = <string[]>get(opts, 'issues', [])
    this.pr = <string[]>get(opts, 'pr', [])
    this.to = get(opts, 'to', 'HEAD')

    isArray(this.actions) && (this.actions = select(this.actions, isString))
    isArray(this.issues) && (this.issues = select(this.issues, isString))
    isArray(this.pr) && (this.pr = select(this.pr, isString))
  }
}

export default CommitQuery
