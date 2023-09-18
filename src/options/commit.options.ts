/**
 * @file Options - CommitOptions
 * @module grease/options/CommitOptions
 */

import { IsConstructor } from '#src/decorators'
import { RepositoryProvider } from '#src/enums'
import Commit from '#src/models/commit.model'
import { get, type Constructor } from '@flex-development/tutils'
import { IsArray, IsEnum, IsString } from 'class-validator'
import GitOptions from './git.options'

/**
 * Commit retrieval and parsing options.
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {GitOptions}
 */
class CommitOptions<T extends Commit = Commit> extends GitOptions {
  /**
   * Parsed commit class.
   *
   * @default Commit
   *
   * @public
   * @instance
   * @member {Constructor<T>} Commit
   */
  @IsConstructor()
  public Commit: Constructor<T>

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
   * Git repository provider.
   *
   * @see {@linkcode RepositoryProvider}
   *
   * @default RepositoryProvider.GITHUB
   *
   * @public
   * @instance
   * @member {RepositoryProvider} provider
   */
  @IsEnum(RepositoryProvider)
  public provider: RepositoryProvider

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
   * @param {Partial<CommitOptions<T>>?} [opts] - Commit options
   */
  constructor(opts?: Partial<CommitOptions<T>>) {
    super(opts)
    this.Commit = get(opts, 'Commit', <Constructor<T>>Commit)
    this.from = get(opts, 'from', '')
    this.issue_prefixes = get(opts, 'issue_prefixes', ['#', 'gh-'])
    this.provider = get(opts, 'provider', RepositoryProvider.GITHUB)
    this.to = get(opts, 'to', 'HEAD')
  }
}

export default CommitOptions
