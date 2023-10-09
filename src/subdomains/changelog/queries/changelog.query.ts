/**
 * @file Queries - ChangelogQuery
 * @module grease/changelog/ChangelogQuery
 */

import * as constants from '#src/changelog/constants'
import type { ICommitType } from '#src/changelog/interfaces'
import { ChangelogAggregator, CommitType } from '#src/changelog/models'
import { IsConstructor } from '#src/decorators'
import { CommitQuery, type Commit } from '#src/git'
import {
  defaults,
  define,
  fallback,
  select,
  unique,
  type Assign,
  type Partial
} from '@flex-development/tutils'
import {
  ArrayNotEmpty,
  IsArray,
  IsInstance,
  IsNumber,
  Min,
  ValidateNested
} from 'class-validator'

/**
 * Changelog entry query parameters.
 *
 * @template T - Parsed commit type
 */
type ChangelogQueryParams<T extends Commit = Commit> = Assign<
  Partial<ChangelogQuery<T>>,
  {
    /**
     * Changelog aggregator.
     *
     * @see {@linkcode ChangelogAggregator}
     */
    Aggregator?: typeof ChangelogAggregator<T>

    /**
     * An array of commit group objects representing explicitly supported commit
     * message types, and whether they should show up in the changelog entry.
     *
     * @see {@linkcode ICommitType}
     *
     * @default constants.TYPES
     */
    types?: ICommitType[]
  }
>

/**
 * Changelog entries query.
 *
 * @see {@linkcode CommitQuery}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {CommitQuery<T>}
 */
class ChangelogQuery<T extends Commit = Commit> extends CommitQuery<T> {
  /**
   * Changelog aggregator class.
   *
   * @default ChangelogAggregator
   *
   * @public
   * @instance
   * @member {typeof ChangelogAggregator<T>} Aggregator
   */
  @IsConstructor()
  public Aggregator: typeof ChangelogAggregator<T>

  /**
   * Number of entries to query.
   *
   * If `0`, all entries are queried.
   *
   * If at least `0`, the commit revision range start ({@linkcode from}) will
   * also be overridden based on this value when the query is executed.
   *
   * @default 1
   *
   * @public
   * @instance
   * @member {number} releases
   */
  @IsNumber()
  @Min(-1)
  public releases: number

  /**
   * An array of objects representing explicitly supported commit message types
   * and their visibility in the changelog.
   *
   * @see {@linkcode CommitType}
   *
   * @default
   *  select(constants.TYPES, null, type => new CommitType(type))
   *
   * @public
   * @instance
   * @member {CommitType[]} types
   */
  @IsArray()
  @ArrayNotEmpty()
  @IsInstance(CommitType, { each: true })
  @ValidateNested()
  public types: CommitType[]

  /**
   * Create a new changelog entries query.
   *
   * @see {@linkcode ChangelogQueryParams}
   *
   * @param {ChangelogQueryParams<T>?} [params] - Query parameters
   */
  constructor(params?: ChangelogQueryParams<T>) {
    super(params)

    const { Aggregator, releases, types } = defaults(fallback(params, {}), {
      Aggregator: ChangelogAggregator,
      releases: 1,
      types: constants.TYPES
    })

    this.Aggregator = Aggregator
    this.releases = releases
    this.types = unique(select(types, null, type => new CommitType(type)))

    // reset revision range if all entries are queried
    !this.releases && define(this, 'from', { value: '' })
  }
}

export { ChangelogQuery as default, type ChangelogQueryParams }
