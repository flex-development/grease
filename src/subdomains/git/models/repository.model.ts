/**
 * @file Models - Repository
 * @module grease/git/models/Repository
 */

import { RepositoryProvider } from '#src/git/enums'
import type {
  RepositoryHost,
  RepositoryKeywords
} from '#src/git/types'
import { PackageManifest } from '#src/models'
import {
  cast,
  defaults,
  get,
  ifelse,
  template,
  trim
} from '@flex-development/tutils'
import {
  IsEnum,
  IsString,
  MinLength
} from 'class-validator'

/**
 * Repository model.
 *
 * @class
 */
class Repository {
  /**
   * Repository owner.
   *
   * @example
   *  'flex-development'
   *
   * @public
   * @readonly
   * @instance
   * @member {string} owner
   */
  @IsString()
  @MinLength(1)
  public readonly owner: string

  /**
   * Repository provider name.
   *
   * @see {@linkcode RepositoryProvider}
   *
   * @default RepositoryProvider.GITHUB
   *
   * @public
   * @readonly
   * @instance
   * @member {RepositoryProvider} provider
   */
  @IsEnum(RepositoryProvider)
  public readonly provider: RepositoryProvider

  /**
   * Repository name.
   *
   * @example
   *  'grease'
   *
   * @public
   * @readonly
   * @instance
   * @member {string} repo
   */
  @IsString()
  @MinLength(1)
  public readonly repo: string

  /**
   * Create a new repository.
   *
   * @param {string?} [remote] - VCS-friendly repository url or reference
   */
  constructor(remote?: string) {
    if (!remote) {
      const { repository } = new PackageManifest().pkg
      remote = get(repository, 'url', <string>repository)
    }

    /**
     * Regular expression used to extract repository name, owner, and provider.
     *
     * @see https://regex101.com/r/pjJWeg
     *
     * @const {RegExp} regex
     */
    const regex: RegExp =
      /(?:(?:https?:\/{2})?(?<provider>bitbucket|git(?:hub|lab))(?:(?:\.(?:com|org)\/)|:))?(?<owner>[\w-]+)\/(?<repo>[\w-]+)/

    // extract repository data
    const {
      owner,
      provider,
      repo
    } = defaults(get(regex.exec(remote = trim(remote)), 'groups', {}), {
      owner: '',
      provider: ifelse(regex.test(remote), RepositoryProvider.GITHUB, ''),
      repo: ''
    })

    // set repository owner, provider, name
    this.owner = owner
    this.provider = <RepositoryProvider>provider
    this.repo = repo
  }

  /**
   * Get `this` repository provider hostname.
   *
   * @see {@linkcode RepositoryHost}
   *
   * @public
   *
   * @return {RepositoryHost} Repository hostname
   */
  public get host(): RepositoryHost {
    return <RepositoryHost>template('{provider}.{tld}', {
      provider: this.provider,
      tld: ifelse(
        this.provider === RepositoryProvider.BITBUCKET,
        'org',
        'com'
      )
    })
  }

  /**
   * Get keywords used in reference URLs.
   *
   * @see {@linkcode RepositoryKeywords}
   *
   * @public
   *
   * @return {RepositoryKeywords} Repository keywords object
   */
  public get keywords(): RepositoryKeywords {
    switch (this.provider) {
      case RepositoryProvider.BITBUCKET:
        return { commit: 'commit', issue: 'issues', pr: 'pull-requests' }
      case RepositoryProvider.GITLAB:
        return { commit: 'commit', issue: 'issues', pr: 'merge_requests' }
      default:
        return { commit: 'commit', issue: 'issues', pr: 'pull' }
    }
  }

  /**
   * Get `this` repository url.
   *
   * @public
   *
   * @return {string} Repository URL
   */
  public toString(): string {
    return template('https://{host}/{owner}/{repo}', cast(this))
  }
}

export default Repository
