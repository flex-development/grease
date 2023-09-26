/**
 * @file Models - PackageManifest
 * @module grease/models/PackageManifest
 */

import { readPackageJson, type ModuleId } from '@flex-development/mlly'
import type { PackageJson } from '@flex-development/pkg-types'
import { DOT, define, pick, type Nullable } from '@flex-development/tutils'
import fs from 'node:fs'
import semver from 'semver'
import AbstractManifest from './manifest.abstract'
import Version from './version.model'

/**
 * Package manifest model.
 *
 * @class
 * @extends {AbstractManifest}
 */
class PackageManifest extends AbstractManifest {
  /**
   * Manifest filename.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} filename
   */
  public readonly filename: string

  /**
   * Package context.
   *
   * @public
   * @readonly
   * @member {PackageJson} pkg
   */
  public readonly pkg: PackageJson

  /**
   * Create a new package manifest.
   *
   * @param {ModuleId?} [dir=DOT] - Module id of manifest directory
   * @throws {Error} If `package.json` is not found
   */
  constructor(dir: ModuleId = DOT) {
    super(dir)
    this.filename = 'package.json'

    /**
     * Package result.
     *
     * @const {Nullable<PackageJson>} pkg
     */
    const pkg: Nullable<PackageJson> = readPackageJson(dir)

    if (!pkg) throw new Error(`${this.filename} not found`, { cause: { dir } })
    this.pkg = pkg
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
