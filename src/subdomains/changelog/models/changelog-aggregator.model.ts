/**
 * @file Models - ChangelogAggregator
 * @module grease/changelog/models/ChangelogAggregator
 */

import type { BreakingChange, Commit, Mention, Reference } from '#src/git'
import {
  constant,
  get,
  group,
  reduce,
  select,
  sort,
  timeunix,
  unique,
  type CompareResult,
  type PropertyKey
} from '@flex-development/tutils'
import * as emoji from 'node-emoji'
import AbstractChangelogAggregator from './changelog-aggregator.abstract'
import CommitGroup from './commit-group.model'

/**
 * Changelog aggregator.
 *
 * @see {@linkcode AbstractChangelogAggregator}
 * @see {@linkcode Commit}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {AbstractChangelogAggregator<T>}
 */
class ChangelogAggregator<T extends Commit = Commit>
  extends AbstractChangelogAggregator<T> {
  /**
   * Get a breaking changes array.
   *
   * @see {@linkcode BreakingChange}
   *
   * @public
   *
   * @return {BreakingChange[]} Sorted breaking changes array
   */
  public get breaks(): BreakingChange[] {
    return sort(unique(reduce(this.commits, (acc, cmt) => [
      ...acc,
      ...cmt.breaks
    ], <BreakingChange[]>[])), this.sortbrk.bind(this))
  }

  /**
   * Get a sorted commit groups array.
   *
   * @see {@linkcode CommitGroup}
   *
   * @public
   *
   * @return {CommitGroup<T>[]} Sorted commit groups array
   */
  public get groups(): CommitGroup<T>[] {
    return sort(select(this.types, null, ({ type: key, ...type }) => {
      return new CommitGroup({
        ...type,
        commits: sort(get(this.map, key, []), this.sortcmt.bind(this)),
        key
      })
    }), this.sortgrp.bind(this))
  }

  /**
   * Get a parsed commit map.
   *
   * @protected
   *
   * @return {Record<string, T[]>} Parsed commit map
   */
  protected get map(): Record<string, T[]> {
    return group(this.commits, this.groupby.bind(this))
  }

  /**
   * Get a mentions array.
   *
   * @see {@linkcode Mention}
   *
   * @public
   *
   * @return {Mention[]} Mentions array
   */
  public get mentions(): Mention[] {
    return unique(reduce(this.commits, (acc, cmt) => [
      ...acc,
      ...cmt.mentions
    ], <Mention[]>[]))
  }

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
  public get references(): Reference[] {
    return unique(reduce(this.commits, (acc, cmt) => [
      ...acc,
      ...cmt.references
    ], <Reference[]>[]))
  }

  /**
   * Get a commit group key.
   *
   * @protected
   *
   * @param {T} commit - Parsed commit
   * @return {PropertyKey} Commit group key
   */
  protected groupby(commit: T): PropertyKey {
    return commit.type
  }

  /**
   * Breaking change sorter.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   *
   * @param {BreakingChange} brk1 - First breaking change to compare
   * @param {BreakingChange} brk2 - Second breaking change to compare
   * @return {CompareResult} Comparison result
   */
  protected sortbrk(
    brk1: BreakingChange,
    brk2: BreakingChange
  ): CompareResult {
    return timeunix(brk2.date) - timeunix(brk1.date)
  }

  /**
   * Commit sorter.
   *
   * @protected
   *
   * @param {T} cmt1 - First commit to compare
   * @param {T} cmt2 - Second commit to compare
   * @return {CompareResult} Comparison result
   */
  protected sortcmt(cmt1: T, cmt2: T): CompareResult {
    return cmt1.header.localeCompare(cmt2.header)
  }

  /**
   * Commit group sorter.
   *
   * @see {@linkcode CommitGroup}
   *
   * @protected
   *
   * @param {CommitGroup<T>} g1 - First commit group to compare
   * @param {CommitGroup<T>} g2 - Second commit group to compare
   * @return {CompareResult} Comparison result
   */
  protected sortgrp(g1: CommitGroup<T>, g2: CommitGroup<T>): CompareResult {
    return emoji
      .emojify(g1.section, { format: constant('') })
      .localeCompare(emoji.emojify(g2.section, { format: constant('') }))
  }
}

export default ChangelogAggregator
