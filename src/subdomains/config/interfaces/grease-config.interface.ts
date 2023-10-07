/**
 * @file Interfaces - IGreaseConfig
 * @module grease/config/interfaces/IGreaseConfig
 */

import type { ChangelogOperationDTO } from '#src/changelog'
import type { Commit } from '#src/git'
import type { GlobalOptions } from '#src/options'
import type { Omit, Partial } from '@flex-development/tutils'

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
   * User changelog options.
   *
   * @see {@linkcode ChangelogOperationDTO}
   */
  changelog?: Omit<ChangelogOperationDTO<T>, keyof GlobalOptions | 'from'>
}

export type { IGreaseConfig as default }
