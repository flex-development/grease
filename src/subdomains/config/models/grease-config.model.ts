/**
 * @file Models - GreaseConfig
 * @module grease/config/models/GreaseConfig
 */

import { ChangelogOperation } from '#src/changelog'
import type { IGreaseConfig } from '#src/config/interfaces'
import { TagOperation, type Commit } from '#src/git'
import { GlobalOptions } from '#src/options'
import { define, get, keys, set } from '@flex-development/tutils'
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
   * Tag options.
   *
   * @see {@linkcode TagOperation}
   *
   * @default
   *  new TagOperation(opts.tag)
   *
   * @public
   * @instance
   * @member {TagOperation} tag
   */
  @IsInstance(TagOperation)
  @ValidateNested()
  public tag: TagOperation

  /**
   * Create a new config object.
   *
   * @see {@linkcode IGreaseConfig}
   *
   * @param {IGreaseConfig<T>?} [opts={}] - User config
   */
  constructor(opts: IGreaseConfig<T> = {}) {
    super(opts)

    define(opts, 'changelog', { value: get(opts, 'changelog', {}) })
    define(opts, 'tag', { value: get(opts, 'tag', {}) })

    Reflect.deleteProperty(opts.changelog!, 'from')
    Reflect.deleteProperty(opts.tag!, 'tag')

    for (const key of keys(opts)) {
      switch (key) {
        case 'changelog':
        case 'tag':
          set(opts, key, { ...get(opts, key), ...this })
          break
        default:
          break
      }
    }

    this.changelog = new ChangelogOperation<T>(opts.changelog)
    this.tag = new TagOperation({ ...opts.tag, tag: '' })
  }
}

export default GreaseConfig
