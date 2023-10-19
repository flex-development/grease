/**
 * @file Queries - TagQueryHandler
 * @module grease/git/queries/TagQueryHandler
 */

import { GitService } from '#src/git/providers'
import { ValidationService } from '#src/providers'
import { select, sift, split, template } from '@flex-development/tutils'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import semver from 'semver'
import TagQuery from './tag.query'

/**
 * Tags query handler.
 *
 * @see {@linkcode TagQuery}
 *
 * @class
 * @implements {IQueryHandler<TagQuery,string[]>}
 */
@QueryHandler(TagQuery)
class TagQueryHandler implements IQueryHandler<TagQuery, string[]> {
  /**
   * Create a new tags query handler.
   *
   * @see {@linkcode GitService}
   * @see {@linkcode ValidationService}
   *
   * @param {GitService} git - Git commands service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly git: GitService,
    protected readonly validator: ValidationService
  ) {}

  /**
   * Execute a tags query.
   *
   * @see {@linkcode TagQuery}
   *
   * @public
   * @async
   *
   * @param {TagQuery} query - Query to execute
   * @return {string[]} Tags array
   */
  public async execute(query: TagQuery): Promise<string[]> {
    await this.validator.validate(query)

    /**
     * Tags list.
     *
     * @const {string} list
     */
    const list: string = await this.git.tag([
      template('--list \'{tagprefix}*\'', { tagprefix: query.tagprefix }),
      ...select(query.sort, null, srt => template('--sort {srt}', { srt }))
    ], query)

    /**
     * Tags and versions array.
     *
     * @const {[string, string][]} releases
     */
    const releases: [string, string][] = select(
      sift(split(list, '\n')),
      null,
      t => [t, t.replace(query.tagprefix, '')]
    )

    return select(releases, ([, version]) => {
      return query.unstable ? true : !semver.parse(version)!.prerelease.length
    }, release => release[0])
  }
}

export default TagQueryHandler
