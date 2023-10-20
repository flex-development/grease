/**
 * @file Operations - ChangelogOperation
 * @module grease/changelog/operations/ChangelogOperation
 */

import { ChangelogFormatter } from '#src/changelog/models'
import {
  ChangelogQuery,
  type ChangelogQueryParams
} from '#src/changelog/queries'
import { IsConstructor, IsOptional } from '#src/decorators'
import type { Commit } from '#src/git'
import pathe from '@flex-development/pathe'
import {
  defaults,
  fallback,
  isFalse,
  type Assign,
  type Optional
} from '@flex-development/tutils'
import { IsBoolean, IsString } from 'class-validator'

/**
 * Changelog operation payload transfer object.
 *
 * @template T - Parsed commit type
 */
type ChangelogOperationDTO<T extends Commit = Commit> = Assign<
  Partial<ChangelogOperation<T>>,
  Partial<ChangelogQueryParams<T>>
>

/**
 * Changelog operation model.
 *
 * @see {@linkcode ChangelogQuery}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {ChangelogQuery<T>}
 */
class ChangelogOperation<T extends Commit = Commit> extends ChangelogQuery<T> {
  /**
   * Changelog formatter class.
   *
   * @default ChangelogFormatter
   *
   * @public
   * @instance
   * @member {typeof ChangelogFormatter<T>} Formatter
   */
  @IsConstructor()
  public Formatter: typeof ChangelogFormatter<T>

  /**
   * Read `CHANGELOG` from this file.
   *
   * @public
   * @instance
   * @member {Optional<string>} infile
   */
  @IsString()
  @IsOptional()
  public infile?: Optional<string>

  /**
   * Write changelog entries to this file.
   *
   * @public
   * @instance
   * @member {Optional<string>} outfile
   */
  @IsString()
  @IsOptional()
  public outfile?: Optional<string>

  /**
   * Do not write content to {@linkcode outfile} or {@linkcode process.stdout}.
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
   * Read existing entries from and output new entries to {@linkcode infile}.
   *
   * @default false
   *
   * @public
   * @instance
   * @member {boolean} samefile
   */
  @IsBoolean()
  public samefile: boolean

  /**
   * Write content to {@linkcode outfile} instead of {@linkcode process.stdout}.
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
   * Create a new changelog operation.
   *
   * @see {@linkcode ChangelogOperationDTO}
   *
   * @param {ChangelogOperationDTO<T>?} [payload] - Operation payload
   */
  constructor(payload?: ChangelogOperationDTO<T>) {
    super(payload)

    const {
      Formatter,
      infile,
      outfile,
      quiet,
      samefile,
      write
    } = defaults(fallback(payload, {}), {
      Formatter: ChangelogFormatter,
      infile: undefined,
      outfile: undefined,
      quiet: false,
      samefile: false,
      write: false
    })

    this.Formatter = Formatter
    this.infile = infile
    this.outfile = outfile
    this.quiet = quiet
    this.samefile = fallback(samefile, !!infile && infile === outfile, isFalse)
    this.write = write

    // silence operation
    this.quiet && (this.write = false)

    // changelog regeneration implies samefile
    !this.releases && this.write && (this.samefile = true)

    // override outfile if changelog should be output to infile
    if (this.samefile) {
      this.outfile = this.infile = fallback(this.infile, 'CHANGELOG.md')
    }

    // resolve infile and outfile relative to cwd
    this.infile && (this.infile = pathe.resolve(this.cwd, this.infile))
    this.outfile && (this.outfile = pathe.resolve(this.cwd, this.outfile))
  }
}

export { ChangelogOperation as default, type ChangelogOperationDTO }
