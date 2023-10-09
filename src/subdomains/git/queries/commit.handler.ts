/**
 * @file Queries - CommitQueryHandler
 * @module grease/git/queries/CommitQueryHandler
 */

import { Repository, type Commit } from '#src/git/models'
import { GitService } from '#src/git/providers'
import { ValidationService } from '#src/providers'
import {
  ifelse,
  join,
  regexp,
  select,
  sift,
  split,
  template,
  trim
} from '@flex-development/tutils'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import CommitQuery from './commit.query'

/**
 * Commits query handler.
 *
 * @see {@linkcode CommitQuery}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @implements {IQueryHandler<CommitQuery,T[]>}
 */
@QueryHandler(CommitQuery)
class CommitQueryHandler<T extends Commit = Commit>
  implements IQueryHandler<CommitQuery, T[]> {
  /**
   * String used to separate commit logs.
   *
   * @public
   * @static
   * @readonly
   * @member {string} DELIMITER
   */
  public static readonly DELIMITER: string = join([
    '--',
    '$',
    '--'
  ], '')

  /**
   * Commit log format.
   *
   * @see https://git-scm.com/docs/git-log#_pretty_formats
   *
   * @public
   * @static
   * @readonly
   * @member {string} FORMAT
   */
  public static readonly FORMAT: string = join([
    '',
    'author.email',
    '%n%ae%n',
    'author.name',
    '%n%an%n',
    'body',
    '%n%b%n',
    'date',
    '%n%cI%n',
    'hash',
    '%n%h%n',
    'header',
    '%n%s%n',
    'sha',
    '%n%H%n',
    'tags',
    '%n%D%n',
    'trailers',
    '%n%(trailers)%n'
  ], '-')

  /**
   * Create a new commits query handler.
   *
   * @param {GitService} git - Git commands service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly git: GitService,
    protected readonly validator: ValidationService
  ) {}

  /**
   * Execute a commits query.
   *
   * @see {@linkcode CommitQuery}
   *
   * @public
   * @async
   *
   * @param {CommitQuery<T>} query - Query to execute
   * @return {T[]} Parsed commit array
   */
  public async execute(query: CommitQuery<T>): Promise<T[]> {
    await this.validator.validate(query)

    /**
     * Raw commit logs.
     *
     * @const {string} logs
     */
    const logs: string = await this.git.log([
      '--decorate-refs=refs/tags',
      '--decorate=short',
      template('--format=\'{format}{delimiter}\'', {
        delimiter: CommitQueryHandler.DELIMITER,
        format: CommitQueryHandler.FORMAT
      }),
      join(sift([query.from, query.to]), '..'),
      ifelse(query.cwd === process.cwd(), '', `-- ${query.cwd}`)
    ], query)

    /**
     * Repository instance.
     *
     * @const {Repository} repository
     */
    const repository: Repository = new Repository(await this.git.origin(query))

    return select(
      split(logs, new RegExp(`${regexp(CommitQueryHandler.DELIMITER)}\n?`)),
      chunk => !!trim(chunk),
      chunk => new query.Commit(trim(chunk), repository, query)
    )
  }
}

export default CommitQueryHandler
