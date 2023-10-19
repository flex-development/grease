/**
 * @file Models - PackageManifest
 * @module grease/models/PackageManifest
 */

import { readPackageJson } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import type { PackageJson } from '@flex-development/pkg-types'
import { DOT, define, pick, type Nullable } from '@flex-development/tutils'
import fs from 'node:fs'
import semver from 'semver'
import AbstractManifest from './manifest.abstract'
import Version from './version.model'

/**
 * Package manifest model.
 *
 * @see {@linkcode AbstractManifest}
 *
 * @class
 * @extends {AbstractManifest}
 */
class PackageManifest extends AbstractManifest {
  /**
   * Absolute path to manifest directory.
   *
   * @public
   * @instance
   * @member {string} dir
   */
  public dir: string

  /**
   * Package context.
   *
   * @public
   * @readonly
   * @instance
   * @member {PackageJson} pkg
   */
  public readonly pkg: PackageJson

  /**
   * Create a new package manifest.
   *
   * @param {string?} [cwd=DOT] - Absolute path to current working directory
   * @throws {Error}
   */
  constructor(cwd: string = DOT) {
    super(cwd)

    /**
     * Package result.
     *
     * @const {Nullable<PackageJson>} pkg
     */
    const pkg: Nullable<PackageJson> = readPackageJson(
      this.dir = pathe.resolve(cwd),
      undefined,
      import.meta.url
    )

    // throw if package was not found
    if (!pkg) {
      throw new Error(`${this.filename} not found`, {
        cause: { dir: this.dir }
      })
    }

    this.pkg = pkg
  }

  /**
   * Get `this` manifest filename.
   *
   * @public
   *
   * @return {string} `this` filename
   */
  public get filename(): string {
    return 'package.json'
  }

  /**
   * Get the current version.
   *
   * Throws if the version does not conform to [Semantic Versioning][1]
   * standards.
   *
   * [1]: https://semver.org
   *
   * @public
   *
   * @return {Version} Package version
   * @throws {Error} If package version is invalid
   */
  public get version(): Version {
    if (semver.valid(this.pkg.version)) return new Version(this.pkg.version!)
    throw new Error('invalid package version', {
      cause: pick(this.pkg, ['version'])
    })
  }

  /**
   * Set the current version.
   *
   * @public
   *
   * @param {Version} version - New package version
   */
  public set version(version: Version) {
    define(this.pkg, 'version', { value: version.version })
  }

  /**
   * Write package data to {@linkcode file}.
   *
   * @public
   *
   * @return {this} `this` manifest
   */
  public write(): this {
    fs.writeFileSync(this.file, JSON.stringify(this.pkg, null, 2) + '\n')
    return this
  }
}

export default PackageManifest
