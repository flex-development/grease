/**
 * @file Models - CommitGroup
 * @module grease/changelog/models/CommitGroup
 */

import type { ICommitGroup } from '#src/changelog/interfaces'
import type { Commit, ICommit } from '#src/git'
import {
  get,
  select,
  trim,
  type Assign,
  type Simplify
} from '@flex-development/tutils'

/**
 * Commit group data transfer object.
 *
 * @template T - Parsed commit type
 */
type CommitGroupDTO<T extends Commit = Commit> = Assign<
  Partial<ICommitGroup<T>>,
  Pick<ICommitGroup, 'key'>
>

/**
 * Parsed commit group model.
 *
 * @see {@linkcode ICommitGroup}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @implements {ICommitGroup<T>}
 */
class CommitGroup<T extends Commit = Commit> implements ICommitGroup<T> {
  /**
   * Parsed commits.
   *
   * @public
   * @instance
   * @member {T[]} commits
   */
  public commits: T[]

  /**
   * Remove commit group from changelog.
   *
   * @default isEmptyString(section)
   *
   * @public
   * @instance
   * @member {boolean} hidden
   */
  public hidden: boolean

  /**
   * Group key.
   *
   * @public
   * @instance
   * @member {string} key
   */
  public key: string

  /**
   * Group title.
   *
   * @default key
   *
   * @public
   * @instance
   * @member {string} section
   */
  public section: string

  /**
   * Create a new commit group.
   *
   * @see {@linkcode CommitGroupDTO}
   *
   * @param {CommitGroupDTO<T>} opts - Commit group options
   */
  constructor(opts: CommitGroupDTO<T>) {
    this.commits = get(opts, 'commits', [])
    this.key = get(opts, 'key')
    this.section = trim(get(opts, 'section', this.key))
    this.hidden = get(opts, 'hidden', false)

    !this.commits.length && (this.hidden = true)
    !this.section && (this.hidden = true)
  }

  /**
   * Get a JSON-serializable commit group object.
   *
   * @template U - JSON serializable commit type
   *
   * @public
   *
   * @return {Simplify<ICommitGroup<U>>} JSON-serializable commit group
   */
  public toJSON<U extends ICommit = ICommit>(): Simplify<ICommitGroup<U>> {
    return {
      commits: select(this.commits, null, commit => <U>commit.toJSON()),
      hidden: this.hidden,
      key: this.key,
      section: this.section
    }
  }
}

export { CommitGroup as default, type CommitGroupDTO }
