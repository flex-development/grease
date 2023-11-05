/**
 * @file Models - ChangelogEntry
 * @module grease/changelog/models/ChangelogEntry
 */

import type { IChangelogEntry } from '#src/changelog/interfaces'
import type {
  BreakingChange,
  Commit,
  ICommit,
  Mention,
  Reference
} from '#src/git'
import { Version } from '#src/models'
import {
  at,
  fallback,
  get,
  isFalsy,
  merge,
  select,
  type Nullable,
  type Optional,
  type Simplify
} from '@flex-development/tutils'
import util from 'node:util'
import semver from 'semver'
import ChangelogAggregator from './changelog-aggregator.model'
import type CommitGroup from './commit-group.model'
import type CommitType from './commit-type.model'

/**
 * Changelog entry data transfer object.
 *
 * @see {@linkcode Commit}
 *
 * @template T - Parsed commit type
 */
type ChangelogEntryDTO<T extends Commit = Commit> = {
  /**
   * Changelog aggregator class.
   *
   * @see {@linkcode ChangelogAggregator}
   *
   * @default ChangelogAggregator
   */
  Aggregator: typeof ChangelogAggregator<T>

  /**
   * Parsed commits.
   */
  commits: readonly T[]

  /**
   * Release tag.
   */
  release: string

  /**
   * Tag prefix to consider when reading tags.
   *
   * @default ''
   */
  tagprefix: string

  /**
   * Git semver tags.
   */
  tags: readonly string[]

  /**
   * An array of commit group objects representing explicitly supported commit
   * message types, and whether they should show up in the changelog entry.
   *
   * @see {@linkcode CommitType}
   */
  types: CommitType[]
}

/**
 * Changelog entry model.
 *
 * @see {@linkcode Commit}
 * @see {@linkcode IChangelogEntry}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @implements {IChangelogEntry<T>}
 */
class ChangelogEntry<T extends Commit = Commit> implements IChangelogEntry<T> {
  /**
   * Changelog aggregator.
   *
   * @see {@linkcode ChangelogAggregator}
   *
   * @protected
   * @readonly
   * @instance
   * @member {ChangelogAggregator<T>} aggregator
   */
  protected readonly aggregator: ChangelogAggregator<T>

  /**
   * Breaking changes.
   *
   * @see {@linkcode BreakingChange}
   *
   * @public
   * @readonly
   * @instance
   * @member {ReadonlyArray<BreakingChange>} breaks
   */
  public readonly breaks: readonly BreakingChange[]

  /**
   * Changelog entry date.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} date
   */
  public readonly date: string

  /**
   * Commit groups.
   *
   * @see {@linkcode CommitGroup}
   *
   * @public
   * @readonly
   * @instance
   * @member {ReadonlyArray<CommitGroup<T>>} groups
   */
  public readonly groups: readonly CommitGroup<T>[]

  /**
   * Key commit.
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<T>} key
   */
  public readonly key: Readonly<T>

  /**
   * Users and/or organizations mentioned in commit subjects.
   *
   * @see {@linkcode Mention}
   *
   * @public
   * @readonly
   * @instance
   * @member {ReadonlyArray<Mention>} mentions
   */
  public readonly mentions: readonly Mention[]

  /**
   * Entry is for patch release?
   *
   * @public
   * @readonly
   * @instance
   * @member {boolean} patch
   */
  public readonly patch: boolean

  /**
   * Entry is for prerelease?
   *
   * @public
   * @readonly
   * @instance
   * @member {boolean} patch
   */
  public readonly prerelease: boolean

  /**
   * Previous release tag.
   *
   * @public
   * @readonly
   * @instance
   * @member {Nullable<string>} previous
   */
  public readonly previous: Nullable<string>

  /**
   * Issue and pull request references.
   *
   * @see {@linkcode Reference}
   *
   * @public
   * @readonly
   * @instance
   * @member {ReadonlyArray<Reference>} references
   */
  public readonly references: readonly Reference[]

  /**
   * Release tag.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} release
   */
  public readonly release: string

  /**
   * Semver-compliant release version.
   *
   * @see {@linkcode Version}
   *
   * @public
   * @readonly
   * @instance
   * @member {Version} version
   */
  public readonly version: Version

  /**
   * Create a changelog entry object.
   *
   * @param {ChangelogEntryDTO<T>} opts - Changelog entry options
   */
  constructor(opts: ChangelogEntryDTO<T>) {
    const { Aggregator, commits, release, tagprefix, tags, types } = opts

    /**
     * Possible key commit.
     *
     * @const {Optional<T>} key
     */
    const key: Optional<T> = commits.find(c => c.version === release)

    /**
     * Current date.
     *
     * @const {string} today
     */
    const today: string = new Intl.DateTimeFormat('fr-ca', {
      day: '2-digit',
      month: '2-digit',
      timeZone: process.env.TZ,
      year: 'numeric'
    }).format(new Date())

    // set entry date
    this.date = get(key, 'date', today).replace(/T.+/, '')
    this.key = fallback(key, at(commits, 0))

    // throw if key commit was not found
    if (isFalsy(this.key)) throw new Error('key commit not found')

    /**
     * Changelog aggregator.
     *
     * @const {ChangelogAggregator<T>} aggregator
     */
    const aggregator: ChangelogAggregator<T> = new Aggregator(types, commits)

    this.aggregator = aggregator
    this.breaks = Object.freeze(this.aggregator.breaks)
    this.groups = Object.freeze(this.aggregator.groups)
    this.key = Object.freeze(this.key)
    this.mentions = Object.freeze(this.aggregator.mentions)
    this.references = Object.freeze(this.aggregator.references)
    this.release = release
    this.version = new Version(this.release.replace(tagprefix, ''))

    this.patch = !!semver.patch(this.version)
    this.prerelease = !!semver.prerelease(this.version)
    this.previous = at(tags, tags.indexOf(this.release) + 1, null)
  }

  /**
   * Get a JSON-serializable changelog entry object.
   *
   * @template U - JSON serializable commit type
   *
   * @public
   *
   * @return {Simplify<IChangelogEntry<U>>} JSON-serializable changelog entry
   */
  public toJSON<U extends ICommit = ICommit>(): Simplify<IChangelogEntry<U>> {
    return {
      breaks: this.breaks,
      date: this.date,
      groups: select(this.groups, null, group => group.toJSON()),
      key: <U>this.key.toJSON(),
      mentions: this.mentions,
      patch: this.patch,
      prerelease: this.prerelease,
      previous: this.previous,
      references: this.references,
      release: this.release
    }
  }

  /**
   * Get a string representation of `this` to use with {@linkcode util.inspect}.
   *
   * @see https://nodejs.org/api/util.html#utilinspectcustom
   * @see https://nodejs.org/api/util.html#utilinspectobject-options
   *
   * @protected
   *
   * @param {number} depth - Number of times to recurse while formatting `this`
   * @param {util.InspectOptions} opts - Inspection options
   * @param {typeof util.inspect} inspect - {@linkcode util.inspect}
   * @return {string} String representation of `this` entry
   */
  protected [util.inspect.custom](
    depth: number,
    opts: util.InspectOptions,
    inspect: typeof util.inspect
  ): string {
    return inspect(this.toJSON(), merge(opts, <typeof opts>{
      breakLength: process.stdout.columns,
      compact: false,
      depth: null,
      maxArrayLength: null,
      maxStringLength: null
    }))
  }
}

export { ChangelogEntry as default, type ChangelogEntryDTO }
