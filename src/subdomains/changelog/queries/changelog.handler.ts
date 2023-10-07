/**
 * @file Queries - ChangelogQueryHandler
 * @module grease/changelog/queries/ChangelogQueryHandler
 */

import { ChangelogEntry } from '#src/changelog/models'
import { GitService, type Commit } from '#src/git'
import { PackageManifest } from '#src/models'
import {
  at,
  entries,
  fallback,
  get,
  group,
  ifelse,
  isNIL,
  isNull,
  reduce,
  reverse,
  sort,
  template,
  timeunix
} from '@flex-development/tutils'
import { QueryHandler, type IQueryHandler } from '@nestjs/cqrs'
import ChangelogQuery from './changelog.query'

/**
 * Changelog entries query handler.
 *
 * @see {@linkcode ChangelogEntry}
 * @see {@linkcode ChangelogQuery}
 *
 * @class
 * @implements {IQueryHandler<ChangelogQuery,ChangelogEntry[]>}
 */
@QueryHandler(ChangelogQuery)
class ChangelogQueryHandler
  implements IQueryHandler<ChangelogQuery, ChangelogEntry[]> {
  /**
   * Create a new changelog entries query handler.
   *
   * @param {GitService} git - Git operations service
   */
  constructor(protected readonly git: GitService) {}

  /**
   * Execute a changelog entries query.
   *
   * @see {@linkcode ChangelogEntry}
   * @see {@linkcode ChangelogQuery}
   *
   * @public
   * @async
   *
   * @param {ChangelogQuery} query - Query to execute
   * @return {ChangelogEntry[]} Changelog entry objects
   */
  public async execute(query: ChangelogQuery): Promise<ChangelogEntry[]> {
    /**
     * Git tags in reverse chronological order.
     *
     * @const {string[]} tags
     */
    const tags: string[] = await this.git.tags(query)

    // reset commit start range based on release count
    query.releases >= 0 && (query.from = fallback(tags[query.releases - 1], ''))

    /**
     * Parsed commits in reverse chronological order.
     *
     * @const {Commit[]} commits
     */
    const commits: Commit[] = await this.git.commits(query)

    /**
     * Package manifest.
     *
     * @const {PackageManifest} pkg
     */
    const pkg: PackageManifest = new PackageManifest(query.cwd)

    /**
     * Parsed commit arrays mapped to releases.
     *
     * @const {Record<string, Commit[]>} relmap
     */
    const relmap: Record<string, Commit[]> = group(commits, (cmt, i, arr) => {
      return fallback(
        cmt.version,
        fallback(
          get(reverse(arr.slice(0, i + 1)).find(k => !!k.version), 'version'),
          template('{tagprefix}{version}{metadata}', {
            metadata: ifelse(
              at(tags, 0, '').endsWith(pkg.version.version),
              template('+{sha}', { sha: get(arr, '0.sha') }),
              ''
            ),
            tagprefix: query.tagprefix,
            version: pkg.version.version
          }),
          isNIL
        ),
        isNull
      )
    })

    return sort(reduce(entries(relmap), (acc, [release, commits]) => [
      ...acc,
      new ChangelogEntry({ ...query, commits, release, tags })
    ], <ChangelogEntry[]>[]), (a, b) => timeunix(b.date) - timeunix(a.date))
  }
}

export default ChangelogQueryHandler
