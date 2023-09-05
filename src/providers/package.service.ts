/**
 * @file Providers - PackageService
 * @module grease/providers/PackageService
 */

import { Version } from '#src/models'
import {
  lookupPackageScope,
  type ModuleId,
  type PackageScope
} from '@flex-development/mlly'
import { define, DOT, type Nullable } from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import semver from 'semver'

/**
 * Package manifest operations provider.
 *
 * @class
 */
@Injectable()
class PackageService {
  /**
   * Package context.
   *
   * @public
   * @readonly
   * @member {Readonly<PackageScope>} scope
   */
  public readonly scope!: Readonly<PackageScope>

  /**
   * Get the current package version.
   *
   * Throws if the package version does not conform to [Semantic Versioning][1]
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
    const { version } = this.scope.pkgjson
    if (semver.valid(version)) return new Version(version!)
    throw new Error('invalid package version', { cause: { version } })
  }

  /**
   * Initialize the package manifest service.
   *
   * @public
   *
   * @param {ModuleId?} [id=DOT] - Module id of package manifest or directory
   * @return {this} `this` package manifest service
   * @throws {Error} If package manifest is not found
   */
  public init(id: ModuleId = DOT): this {
    /**
     * Package scope result.
     *
     * @const {Nullable<PackageScope>} scope
     */
    const scope: Nullable<PackageScope> = lookupPackageScope(id, id)

    // throw if package scope is invalid
    if (!scope) throw new Error('invalid package scope', { cause: { id } })
    return define(this, 'scope', { value: Object.freeze(scope) })
  }
}

export default PackageService
