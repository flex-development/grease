/**
 * @file Operations - BumpOperation
 * @module grease/bump/operations/BumpOperation
 */

import { IsReleaseVersion } from '#src/decorators'
import { GitOptions } from '#src/git'
import type { ReleaseVersion } from '#src/types'
import { defaults, type Assign, type Pick } from '@flex-development/tutils'
import { IsBoolean, IsIn, IsString } from 'class-validator'

/**
 * Bump operation payload transfer object.
 */
type BumpOperationDTO = Assign<
  Partial<BumpOperation>,
  Pick<BumpOperation, 'release'>
>

/**
 * Version bump operation model.
 *
 * @see {@linkcode GitOptions}
 *
 * @class
 * @extends {GitOptions}
 */
class BumpOperation extends GitOptions {
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
   * Write version bump to manifest.
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
   * Create a new version bump operation.
   *
   * @see {@linkcode BumpOperationDTO}
   *
   * @param {BumpOperationDTO} payload - Operation payload
   */
  constructor(payload: BumpOperationDTO) {
    super(payload)

    const {
      preid,
      prestart,
      release,
      write
    } = defaults(payload, {
      preid: 'alpha',
      prestart: 1 as const,
      write: false
    })

    this.preid = preid
    this.prestart = prestart
    this.release = release
    this.write = write
  }
}

export { BumpOperation as default, type BumpOperationDTO }
