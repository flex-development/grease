/**
 * @file Models - GreaseConfig
 * @module grease/config/models/GreaseConfig
 */

import { ChangelogOperation } from '#src/changelog'
import type { IGreaseConfig } from '#src/config/interfaces'
import type { Commit } from '#src/git'
import { GlobalOptions } from '#src/options'
import { get, omit } from '@flex-development/tutils'
import { IsInstance, ValidateNested } from 'class-validator'

/**
 * Grease configuration options.
 *
 * @see {@linkcode GlobalOptions}
 * @see {@linkcode IGreaseConfig}
 *
 * @template T — Parsed commit type
 *
 * @class
 * @extends {GlobalOptions}
 * @implements {IGreaseConfig<T>}
 */
class GreaseConfig<T extends Commit = Commit> extends GlobalOptions
  implements IGreaseConfig<T> {
  /**
   * Changelog options.
   *
   * @see {@linkcode ChangelogOperation}
   *
   * @default
   *  new ChangelogOperation(opts.changelog)
   *
   * @public
   * @instance
   * @member {ChangelogOperation<T>} changelog
   */
  @IsInstance(ChangelogOperation)
  @ValidateNested()
  public changelog: ChangelogOperation<T>

  /**
   * Create a new options object.
   *
   * @see {@linkcode IGreaseConfig}
   *
   * @param {IGreaseConfig<T>?} [opts={}] - User options
   */
  constructor(opts: IGreaseConfig<T> = {}) {
    super(opts)

    this.changelog = new ChangelogOperation<T>({
      ...omit(get(opts, 'changelog'), ['from']),
      ...this
    })
  }
}

export default GreaseConfig
