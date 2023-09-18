/**
 * @file Providers - BumpService
 * @module grease/providers/BumpService
 */

import { ReleaseType } from '#src/enums'
import type { ICommit } from '#src/interfaces'
import { Version } from '#src/models'
import { BumpOptions, GitTagOptions, type BumpOptionsDTO } from '#src/options'
import type { RecommendedBump } from '#src/types'
import type { PackageJson } from '@flex-development/pkg-types'
import { at, define, type Partial } from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import consola from 'consola'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import GitService from './git.service'
import PackageService from './package.service'
import ValidationService from './validation.service'

/**
 * Version bump operations provider.
 *
 * @class
 */
@Injectable()
class BumpService {
  /**
   * Create a new version bump service.
   *
   * @param {PackageService} manifest - Package manifest service
   * @param {GitService} git - Git operations service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly manifest: PackageService,
    protected readonly git: GitService,
    protected readonly validator: ValidationService
  ) {}

  /**
   * Bump a package version.
   *
   * @see {@linkcode BumpOptionsDTO}
   * @see {@linkcode Version}
   *
   * @public
   * @async
   *
   * @param {BumpOptionsDTO} opts - User version bump options
   * @return {Promise<Version>} Bumped version
   */
  public async bump(opts: BumpOptionsDTO): Promise<Version> {
    const {
      manifest,
      preid,
      prestart,
      release,
      silent,
      write
    } = await this.validator.validate(new BumpOptions(opts))

    // initialize package manifest service
    this.manifest.init(manifest)

    /**
     * Package manifest object.
     *
     * @const {PackageJson} pkgjson
     */
    const pkgjson: PackageJson = { ...this.manifest.scope.pkgjson }

    /**
     * New package version.
     *
     * @const {Version} version
     */
    const version: Version = this.manifest.version

    // exit early if bump is not needed
    if (version.version === release) return version

    // bump version
    version.inc(release, preid, prestart)
    define(pkgjson, 'version', { value: version.version })

    // write version bump to package manifest
    if (write) {
      await fs.writeFile(
        fileURLToPath(this.manifest.scope.pkg),
        JSON.stringify(pkgjson, null, 2) + '\n'
      )
    }

    !silent && consola.success('bumped version to', version.version)
    return version
  }

  /**
   * Get a version bump recommendation.
   *
   * @see {@linkcode GitTagOptions}
   * @see {@linkcode RecommendedBump}
   *
   * @public
   * @async
   *
   * @param {Partial<GitTagOptions>} [opts] - Recommendation options
   * @return {Promise<RecommendedBump>} Recommended version bump
   */
  public async recommend(
    opts: Partial<GitTagOptions> = {}
  ): Promise<RecommendedBump> {
    /**
     * Commits since last release.
     *
     * @const {ICommit[]} commits
     */
    const commits: ICommit[] = await this.git.commits({
      ...opts,
      from: at(await this.git.tags(opts), 0, '')
    })

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

    return {
      breaks,
      bump: breaks
        ? ReleaseType.MAJOR
        : features
        ? ReleaseType.MINOR
        : ReleaseType.PATCH,
      commits: commits.length,
      features
    }
  }
}

export default BumpService
