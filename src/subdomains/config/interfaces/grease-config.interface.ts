/**
 * @file Interfaces - IGreaseConfig
 * @module grease/config/interfaces/IGreaseConfig
 */

import type { ChangelogOperationDTO } from '#src/changelog'
import type { Commit, TagOperationDTO } from '#src/git'
import type { GlobalOptions } from '#src/options'
import type {
  ObjectCurly,
  Omit,
  Partial,
  PropertyKey
} from '@flex-development/tutils'

/**
 * User configuration helper used to remove global options from `T`.
 *
 * @internal
 *
 * @template T - Options object type
 * @template K - Additional keys to omit
 */
type GreaseConfigHelper<
  T extends ObjectCurly,
  K extends PropertyKey = never
> = Omit<
  T,
  K | keyof GlobalOptions
>

/**
 * Grease user configuration object.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode GlobalOptions}
 *
 * @template T — Parsed commit type
 *
 * @extends {Partial<GlobalOptions>}
 */
interface IGreaseConfig<T extends Commit = Commit>
  extends Partial<GlobalOptions> {
  /**
   * Changelog options.
   *
   * @see {@linkcode ChangelogOperationDTO}
   */
  changelog?: GreaseConfigHelper<ChangelogOperationDTO<T>, 'from'>

  /**
   * Tag options.
   *
   * @see {@linkcode TagOperationDTO}
   */
  tag?: GreaseConfigHelper<TagOperationDTO, 'tag'>
}

export type { GreaseConfigHelper, IGreaseConfig as default }
