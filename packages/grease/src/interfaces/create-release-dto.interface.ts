import type { PathLike, SemanticVersion } from '@grease/types'

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
  notes?: string

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
   * Release tag prefix.
   *
   * @default 'v'
   */
  tagPrefix?: string

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
   * Version being released.
   */
  version: SemanticVersion
}
