import type { Config } from 'conventional-changelog-config-spec'
import type { ICommitType } from './commit-type.interface'

/**
 * @file Interfaces - IChangelogPreset
 * @module grease/interfaces/IChangelogPreset
 */

/**
 * Object representing a custom [Conventional Changelog][1] preset.
 *
 * [1]: https://github.com/conventional-changelog/conventional-changelog
 *
 * @extends {Omit<Config, 'types'>}
 */
export interface IChangelogPreset extends Omit<Config, 'types'> {
  /**
   * Preset name.
   */
  name: string

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
  types?: ICommitType[]
}
