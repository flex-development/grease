/**
 * @file Options - BumpOptions
 * @module grease/options/BumpOptions
 */

import { IsManifestId, IsReleaseVersion } from '#src/decorators'
import type { ReleaseVersion } from '#src/types'
import type { ModuleId } from '@flex-development/mlly'
import { DOT, defaults, type Assign } from '@flex-development/tutils'
import { IsBoolean, IsIn, IsString } from 'class-validator'

/**
 * User version bump options.
 */
type BumpOptionsDTO = Assign<Partial<BumpOptions>, {
  /**
   * Release type or version.
   */
  release: BumpOptions['release']
}>

/**
 * Version bump options.
 *
 * @class
 */
class BumpOptions {
  /**
   * Module id of package manifest or directory.
   *
   * @default DOT
   *
   * @public
   * @instance
   * @member {ModuleId} manifest
   */
  @IsManifestId()
  public manifest: ModuleId

  /**
   * Prerelease identifier.
   *
   * @see https://docs.npmjs.com/cli/commands/npm-dist-tag
   *
   * @default 'alpha'
   *
   * @public
   * @instance
   * @member {string} preid
   */
  @IsString()
  public preid: string

  /**
   * Base to be used for prerelease identifier.
   *
   * @default 1
   *
   * @public
   * @instance
   * @member {0 | 1} prestart
   */
  @IsIn([0, 1])
  public prestart: 0 | 1

  /**
   * Release type or version.
   *
   * @public
   * @instance
   * @member {ReleaseVersion} release
   */
  @IsReleaseVersion()
  public release: ReleaseVersion

  /**
   * Disable logs.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} silent
   */
  @IsBoolean()
  public silent: boolean

  /**
   * Write version bump to package manifest.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} write
   */
  @IsBoolean()
  public write: boolean

  /**
   * Create a new options object.
   *
   * @see {@linkcode BumpOptionsDTO}
   *
   * @param {BumpOptionsDTO} opts - User version bump options
   */
  constructor(opts: BumpOptionsDTO) {
    const {
      manifest,
      preid,
      prestart,
      release,
      silent,
      write
    } = defaults(opts, {
      manifest: DOT,
      preid: 'alpha',
      prestart: 1 as const,
      silent: false,
      write: false
    })

    this.manifest = manifest
    this.preid = preid
    this.prestart = prestart
    this.release = release
    this.silent = silent
    this.write = write
  }
}

export { BumpOptions as default, type BumpOptionsDTO }
