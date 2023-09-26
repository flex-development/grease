/**
 * @file Options - GitCommitOptions
 * @module grease/git/options/GitCommitOptions
 */

import { IsConstructor } from '#src/decorators'
import { Commit } from '#src/git/models'
import type { CommitConstructor } from '#src/git/types'
import {
  define,
  get,
  type Constructor,
  type Omit,
  type Partial
} from '@flex-development/tutils'
import { IsInstance, IsString, ValidateNested } from 'class-validator'
import CommitGrammarOptions from './commit-grammar.options'
import GitOptions from './git.options'

/**
 * Git commit retrieval and parsing options.
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
   * Commit parser grammar options.
   *
   * @default new CommitGrammarOptions(this)
   *
   * @public
   * @instance
   * @member {Omit<CommitGrammarOptions, 'provider' | 'tagprefix'>} grammar
   */
  @IsInstance(CommitGrammarOptions)
  @ValidateNested()
  public grammar: Omit<CommitGrammarOptions, 'provider' | 'tagprefix'>

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
    this.from = get(opts, 'from', '')
    this.grammar = new CommitGrammarOptions(get(opts, 'grammar'))
    this.to = get(opts, 'to', 'HEAD')
    define(this.grammar, 'tagprefix', { value: this.tagprefix })
  }
}

export default GitCommitOptions
