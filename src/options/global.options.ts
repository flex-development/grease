/**
 * @file Options - GlobalOptions
 * @module grease/options/GlobalOptions
 */

import { IsBoolable, IsDirectory, IsFile } from '#src/decorators'
import pathe from '@flex-development/pathe'
import { DOT, get, isString, type Partial } from '@flex-development/tutils'
import { IsBoolean, IsString } from 'class-validator'

/**
 * Global grease options.
 *
 * @class
 */
class GlobalOptions {
  /**
   * Enable colorized output.
   *
   * @default true
   *
   * @public
   * @instance
   * @member {boolean} colors
   */
  @IsBoolean()
  public colors: boolean

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
   * Enable verbose output.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} debug
   */
  @IsBoolean()
  public debug: boolean

  /**
   * Disable logs.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} quiet
   */
  @IsBoolean()
  public quiet: boolean

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
   * Include unstable tags.
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
    this.colors = get(opts, 'colors', true)
    this.config = get(opts, 'config', true)
    this.cwd = pathe.resolve(get(opts, 'cwd', DOT))
    this.debug = get(opts, 'debug', false)
    this.quiet = get(opts, 'quiet', false)
    this.tagprefix = get(opts, 'tagprefix', '')
    this.unstable = get(opts, 'unstable', true)

    // resolve config path
    if (isString(this.config) && !pathe.isAbsolute(this.config)) {
      this.config = pathe.resolve(this.cwd, this.config)
    }
  }
}

export default GlobalOptions
