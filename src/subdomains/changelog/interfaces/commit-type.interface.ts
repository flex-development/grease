/**
 * @file Interfaces - ICommitType
 * @module grease/changelog/interfaces/ICommitType
 */

/**
 * Object representing an explicitly supported commit message type.
 */
interface ICommitType {
  /**
   * Remove commit type from changelog.
   *
   * @default false
   */
  hidden?: boolean

  /**
   * Commit group title.
   *
   * @default type
   */
  section?: string

  /**
   * Commit type.
   */
  type: string
}

export type { ICommitType as default }
