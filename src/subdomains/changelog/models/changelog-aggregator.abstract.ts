/**
 * @file Models - AbstractChangelogAggregator
 * @module grease/changelog/models/AbstractChangelogAggregator
 */

import type { BreakingChange, Commit, Mention, Reference } from '#src/git'
import {
  hasOwn,
  select,
  type CompareResult,
  type PropertyKey
} from '@flex-development/tutils'
import type CommitGroup from './commit-group.model'
import type CommitType from './commit-type.model'

/**
 * Abstract changelog aggregator.
 *
 * @template T - Parsed commit type
 *
 * @abstract
 * @class
 */
abstract class AbstractChangelogAggregator<T extends Commit = Commit> {
  /**
   * Parsed commits.
   *
   * @public
   * @readonly
   * @instance
   * @member {ReadonlyArray<T>} commits
   */
  public readonly commits: readonly T[]

  /**
   * An array of objects representing explicitly supported commit message types,
   * and whether they should show up in the changelog.
   *
   * @see {@linkcode CommitType}
   *
   * @protected
   * @readonly
   * @instance
   * @member {ReadonlyArray<CommitType>} types
   */
  protected readonly types: readonly CommitType[]

  /**
   * Create a new changelog aggregator.
   *
   * @param {ReadonlyArray<CommitType>} types - Commit message types
   * @param {ReadonlyArray<T>?} [commits=[]] - Parsed commits
   */
  constructor(types: readonly CommitType[], commits: readonly T[] = []) {
    this.commits = Object.freeze(commits)
    this.types = Object.freeze(select(types, t => hasOwn(this.map, t.type)))
  }

  /**
   * Get a breaking changes array.
   *
   * @see {@linkcode BreakingChange}
   *
   * @public
   * @abstract
   *
   * @return {BreakingChange[]} Breaking changes array
   */
  public abstract get breaks(): BreakingChange[]

  /**
   * Get a sorted commit groups array.
   *
   * @see {@linkcode CommitGroup}
   *
   * @public
   * @abstract
   *
   * @return {CommitGroup<T>[]} Sorted commit groups array
   */
  public abstract get groups(): CommitGroup<T>[]

  /**
   * Get a parsed commit map.
   *
   * @protected
   * @abstract
   *
   * @return {Record<string, T[]>} Parsed commit map
   */
  protected abstract get map(): Record<string, T[]>

  /**
   * Get a mentions array.
   *
   * @see {@linkcode Mention}
   *
   * @public
   * @abstract
   *
   * @return {Mention[]} Mentions array
   */
  public abstract get mentions(): Mention[]

  /**
   * Get an array containing issue and pull request references.
   *
   * @see {@linkcode Reference}
   *
   * @public
   * @abstract
   *
   * @return {Reference[]} References array
   */
  public abstract get references(): Reference[]

  /**
   * Get a commit group key.
   *
   * @protected
   * @abstract
   *
   * @param {T} commit - Parsed commit
   * @return {PropertyKey} Commit group key
   */
  protected abstract groupby(commit: T): PropertyKey

  /**
   * Breaking change sorter.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   * @abstract
   *
   * @param {BreakingChange} brk1 - First breaking change to compare
   * @param {BreakingChange} brk2 - Second breaking change to compare
   * @return {CompareResult} Comparison result
   */
  protected abstract sortbrk(
    brk1: BreakingChange,
    brk2: BreakingChange
  ): CompareResult

  /**
   * Commit sorter.
   *
   * @protected
   * @abstract
   *
   * @param {T} cmt1 - First commit to compare
   * @param {T} cmt2 - Second commit to compare
   * @return {CompareResult} Comparison result
   */
  protected abstract sortcmt(cmt1: T, cmt2: T): CompareResult

  /**
   * Commit group sorter.
   *
   * @see {@linkcode CommitGroup}
   *
   * @protected
   * @abstract
   *
   * @param {CommitGroup<T>} g1 - First commit group to compare
   * @param {CommitGroup<T>} g2 - Second commit group to compare
   * @return {CompareResult} Comparison result
   */
  protected abstract sortgrp(
    g1: CommitGroup<T>,
    g2: CommitGroup<T>
  ): CompareResult
}

export default AbstractChangelogAggregator
