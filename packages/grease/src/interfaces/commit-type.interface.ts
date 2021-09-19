import type { Config } from 'conventional-changelog-config-spec'

/**
 * @file Interfaces - ICommitType
 * @module grease/interfaces/ICommitType
 */

/**
 * Object representing a commit type's settings in the `CHANGELOG`.
 */
export interface ICommitType {
  /**
   * Set to `true` to hide matched commit types the `CHANGELOG`.
   */
  hidden?: Config.Type.Base['hidden']

  /**
   * Section where the matched commit type will display in the `CHANGELOG`.
   */
  section?: Config.Type.Base['section']

  /**
   * String used to match `<type>`s used in Conventional Commits specification.
   */
  type: Config.Type.Base['type']
}
