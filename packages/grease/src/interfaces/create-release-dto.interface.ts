import type { NullishString } from '@flex-development/tutils'
import type {
  PathLike,
  SemanticVersion,
  SemanticVersionTag
} from '@grease/types'

/**
 * @file Interfaces - ICreateReleaseDTO
 * @module grease/interfaces/ICreateReleaseDTO
 */

export interface ICreateReleaseDTO {
  /**
   * Save release as a draft instead of publishing it.
   *
   * @default true
   */
  draft?: boolean

  /**
   * Release asset paths.
   */
  files?: PathLike[]

  /**
   * Release notes.
   */
  notes?: NullishString

  /**
   * Read release notes from file.
   */
  notesFile?: PathLike

  /**
   * Mark as a prerelease.
   */
  prerelease?: boolean

  /**
   * Select another repository using the `[HOST/]OWNER/REPO` format.
   */
  repo?: string

  /**
   * Target branch or full commit SHA.
   *
   * @default 'main'
   */
  target?: string

  /**
   * Release title.
   */
  title?: string

  /**
   * Release tag.
   */
  version: SemanticVersion | SemanticVersionTag
}
