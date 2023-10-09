/**
 * @file Queries - BumpQueryHandler
 * @module grease/bump/queries/BumpQueryHandler
 */

import { RecommendedBump } from '#src/bump/models'
import { CommitQuery, TagQuery, type ICommit } from '#src/git'
import { ValidationService } from '#src/providers'
import { at } from '@flex-development/tutils'
import { QueryBus, QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import BumpQuery from './bump.query'

/**
 * Recommended version bump query handler.
 *
 * @see {@linkcode BumpQuery}
 * @see {@linkcode RecommendedBump}
 *
 * @class
 * @implements {IQueryHandler<BumpQuery,RecommendedBump>}
 */
@QueryHandler(BumpQuery)
class BumpQueryHandler implements IQueryHandler<BumpQuery, RecommendedBump> {
  /**
   * Create a new recommended version bump query handler.
   *
   * @param {QueryBus} queries - Query bus
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly queries: QueryBus,
    protected readonly validator: ValidationService
  ) {}

  /**
   * Execute a version bump recommendation query.
   *
   * @see {@linkcode BumpQuery}
   * @see {@linkcode RecommendedBump}
   *
   * @public
   * @async
   *
   * @param {BumpQuery} query - Query to execute
   * @return {RecommendedBump} Recommended version bump
   */
  public async execute(query: BumpQuery): Promise<RecommendedBump> {
    await this.validator.validate(query)

    /**
     * Commits since last release.
     *
     * @const {ICommit[]} commits
     */
    const commits: ICommit[] = await this.queries.execute(new CommitQuery({
      ...query,
      from: at(await this.queries.execute(new TagQuery(query)), 0, '')
    }))

    /**
     * Total number of breaking changes committed since last release.
     *
     * @const {number} breaks
     */
    const breaks: number = commits.reduce((acc, commit) => {
      return acc + (commit.breaking ? 1 : 0)
    }, 0)

    /**
     * Total number of features committed since last release.
     *
     * @const {number} features
     */
    const features: number = commits.reduce((acc, commit) => {
      return acc + (/^feat(ure)?/.test(commit.type) ? 1 : 0)
    }, 0)

    return new RecommendedBump({ breaks, commits: commits.length, features })
  }
}

export default BumpQueryHandler
