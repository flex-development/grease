import type {
  GitSemverTagsOptions,
  PathLike,
  StandardVersionOptions
} from '@grease/types'
import type { Config } from 'conventional-changelog-config-spec'
import type { IGreaseScripts } from './grease-scripts.interface'
import type { IGreaseSkip } from './grease-skip.interface'

/**
 * @file Interfaces - IGreaseOptions
 * @module grease/interfaces/IGreaseOptions
 */

/**
 * `grease` options interface.
 *
 * @extends StandardVersionOptions
 */
export interface IGreaseOptions
  extends Omit<StandardVersionOptions, 'infile' | 'types'> {
  /**
   * Read the CHANGELOG from this file.
   *
   * @default 'CHANGELOG.md'
   */
  infile?: PathLike

  /**
   * Name of the package from which tags will be extracted.
   */
  lernaPackage?: GitSemverTagsOptions['package']

  /**
   * Map containing scripts to execute before and/or lifecycle events.
   *
   * @default {}
   */
  scripts?: IGreaseScripts

  /**
   * Map of lifecycles that should be skipped.
   *
   * @default {}
   */
  skip?: IGreaseSkip

  /**
   * If `true`, unstable tags (e.g. `x.x.x-rc.2`) will be skipped.
   */
  skipUnstable?: GitSemverTagsOptions['skipUnstable']

  /**
   * An array of `type` objects representing the explicitly supported commit
   * message types, and whether they should show up in generated `CHANGELOG`s.
   *
   * @default
   *  [
   *    { type: 'feat', section: 'Features' },
   *    { type: 'fix', section: 'Bug Fixes' },
   *    { type: 'chore', hidden: true },
   *    { type: 'docs', hidden: true },
   *    { type: 'style', hidden: true },
   *    { type: 'refactor', hidden: true },
   *    { type: 'perf', hidden: true },
   *    { type: 'test', hidden: true }
   *  ]
   */
  types?: Config.Type.Base[]
}
