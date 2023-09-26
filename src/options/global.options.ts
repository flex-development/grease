/**
 * @file Options - GlobalOptions
 * @module grease/options/GlobalOptions
 */

import { IsDirectory } from '#src/decorators'
import pathe from '@flex-development/pathe'
import { DOT, get } from '@flex-development/tutils'
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
   * @member {boolean} silent
   */
  @IsBoolean()
  public silent: boolean

  /**
   * Tag prefix to consider when reading tags.
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
   * Create a new options object.
   *
   * @param {Partial<GlobalOptions>?} [opts] - Global user options
   */
  constructor(opts?: Partial<GlobalOptions>) {
    this.colors = get(opts, 'colors', true)
    this.cwd = pathe.resolve(get(opts, 'cwd', DOT))
    this.debug = get(opts, 'debug', false)
    this.silent = get(opts, 'silent', false)
    this.tagprefix = get(opts, 'tagprefix', '')
  }
}

export default GlobalOptions
