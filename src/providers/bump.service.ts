/**
 * @file Providers - BumpService
 * @module grease/providers/BumpService
 */

import { Version } from '#src/models'
import { BumpOptions, type BumpOptionsDTO } from '#src/options'
import type { PackageJson } from '@flex-development/pkg-types'
import { cast, define } from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import { validateOrReject } from 'class-validator'
import consola from 'consola'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import PackageService from './package.service'

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
   */
  constructor(protected readonly manifest: PackageService) {}

  /**
   * Bump a package version.
   *
   * @public
   * @async
   *
   * @param {BumpOptionsDTO} opts - User version bump options
   * @return {Promise<Version>} Bumped version
   * @throws {Error} If release version is invalid
   */
  public async bump(opts: BumpOptionsDTO): Promise<Version> {
    // validate options
    await validateOrReject(opts = new BumpOptions(opts), {
      forbidUnknownValues: false,
      skipMissingProperties: false,
      stopAtFirstError: false,
      validationError: { target: false, value: true }
    })

    // bump options
    const {
      manifest,
      preid,
      prestart,
      release,
      silent,
      write
    } = cast<BumpOptions>(opts)

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
}

export default BumpService
