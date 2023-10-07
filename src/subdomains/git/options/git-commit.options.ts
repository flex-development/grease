/**
 * @file Options - GitCommitOptions
 * @module grease/git/options/GitCommitOptions
 */

import { IsConstructor } from '#src/decorators'
import { Commit } from '#src/git/models'
import type { CommitConstructor } from '#src/git/types'
import {
  get,
  isString,
  select,
  type Constructor,
  type Partial
} from '@flex-development/tutils'
import { IsArray, IsString, MinLength } from 'class-validator'
import GitOptions from './git.options'

/**
 * Git commit retrieval and parsing options.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode GitOptions}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {GitOptions}
 */
class GitCommitOptions<T extends Commit = Commit> extends GitOptions {
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
   * @param {Partial<GitCommitOptions<T>>?} [opts] - Git commit options
   */
  constructor(opts?: Partial<GitCommitOptions<T>>) {
    super(opts)
    this.Commit = get(opts, 'Commit', <Constructor<T>>Commit)
    this.actions = select(get(opts, 'actions'), isString)
    this.from = get(opts, 'from', '')
    this.issues = select(get(opts, 'issues'), isString)
    this.pr = select(get(opts, 'pr'), isString)
    this.to = get(opts, 'to', 'HEAD')
  }
}

export default GitCommitOptions
