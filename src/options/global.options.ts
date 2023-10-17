/**
 * @file Options - GlobalOptions
 * @module grease/options/GlobalOptions
 */

import { IsBoolable, IsDirectory, IsFile } from '#src/decorators'
import { UserLogLevel } from '#src/log'
import pathe from '@flex-development/pathe'
import {
  DOT,
  defaults,
  fallback,
  isString,
  type OrLowercase,
  type Partial
} from '@flex-development/tutils'
import { IsBoolean, IsEnum, IsString } from 'class-validator'

/**
 * Global grease options.
 *
 * @class
 */
class GlobalOptions {
  /**
   * Colorized output enabled?
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean} color
   */
  @IsBoolean()
  public color: boolean

  /**
   * Path to config file, or a boolean indicating if config search is enabled.
   *
   * Non-absolute paths will be resolved relative to {@linkcode cwd}.
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean | string} config
   */
  @IsFile()
  @IsBoolable()
  public config: boolean | string

  /**
   * Path to current working directory.
   *
   * @default pathe.resolve(DOT)
   *
   * @public
   * @instance
   * @member {string} cwd
   */
  @IsDirectory()
  public cwd: string

  /**
   * Log level.
   *
   * @default UserLogLevel.WARN
   *
   * @public
   * @instance
   * @member {OrLowercase<UserLogLevel>} level
   */
  @IsEnum(UserLogLevel)
  public level: OrLowercase<UserLogLevel>

  /**
   * Tag prefix to consider when creating and listing tags.
   *
   * @default ''
   *
   * @public
   * @instance
   * @member {string} tagprefix
   */
  @IsString()
  public tagprefix: string

  /**
   * Allow prereleases.
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean} unstable
   */
  @IsBoolean()
  public unstable: boolean

  /**
   * Create a new options object.
   *
   * @param {Partial<GlobalOptions>?} [opts] - User options
   */
  constructor(opts?: Partial<GlobalOptions>) {
    const {
      color,
      config,
      cwd,
      level,
      tagprefix,
      unstable
    } = defaults(fallback(opts, {}), {
      color: true,
      config: true,
      cwd: DOT,
      level: UserLogLevel.WARN,
      tagprefix: '',
      unstable: true
    })

    this.color = color
    this.config = config
    this.cwd = pathe.resolve(cwd)
    this.level = level
    this.tagprefix = tagprefix
    this.unstable = unstable

    // resolve config path
    if (isString(this.config) && !pathe.isAbsolute(this.config)) {
      this.config = pathe.resolve(this.cwd, this.config)
    }
  }
}

export default GlobalOptions
