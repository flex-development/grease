/**
 * @file Models - AbstractChangelogFormatter
 * @module grease/changelog/models/AbstractChangelogFormatter
 */

import type {
  BreakingChange,
  Commit,
  Mention,
  Reference,
  Repository
} from '#src/git'
import {
  ifelse,
  template,
  trim,
  type JsonObject,
  type TemplateData
} from '@flex-development/tutils'
import type ChangelogEntry from './changelog-entry.model'
import type CommitGroup from './commit-group.model'

/**
 * Abstract changelog formatter.
 *
 * @see {@linkcode Commit}
 *
 * @template T - Parsed commit type
 *
 * @abstract
 * @class
 */
abstract class AbstractChangelogFormatter<T extends Commit = Commit> {
  /**
   * Format a breaking change note.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   * @abstract
   *
   * @param {BreakingChange} brk - Breaking change object
   * @return {string} Formatted breaking change note
   */
  protected abstract formatBreakingChange(brk: BreakingChange): string

  /**
   * Format breaking change notes.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   * @abstract
   *
   * @param {ReadonlyArray<BreakingChange>} breaks - Breaking change objects
   * @return {string} Formatted breaking change notes
   */
  protected abstract formatBreakingChanges(
    breaks: readonly BreakingChange[]
  ): string

  /**
   * Format a commit message.
   *
   * @protected
   * @abstract
   *
   * @param {T} commit - Parsed commit
   * @return {string} Formatted commit message
   */
  protected abstract formatCommit(commit: T): string

  /**
   * Format a commit group.
   *
   * @see {@linkcode CommitGroup}
   *
   * @protected
   * @abstract
   *
   * @param {CommitGroup<T>} group - Commit group
   * @return {string} Formatted commit group
   */
  protected abstract formatCommitGroup(group: CommitGroup<T>): string

  /**
   * Format a commit URL.
   *
   * @protected
   * @abstract
   *
   * @param {T} commit - Parsed commit
   * @return {string} Formatted commit URL
   */
  protected abstract formatCommitUrl(commit: T): string

  /**
   * Format a changelog entry comparison url.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   * @abstract
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry comparison url
   */
  protected abstract formatCompareUrl(entry: ChangelogEntry<T>): string

  /**
   * Format a changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @public
   * @abstract
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry
   */
  public abstract formatEntry(entry: ChangelogEntry<T>): string

  /**
   * Format a changelog entry title.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   * @abstract
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry title
   */
  protected abstract formatEntryTitle(entry: ChangelogEntry<T>): string

  /**
   * Format a mention.
   *
   * @see {@linkcode Mention}
   *
   * @protected
   * @abstract
   *
   * @param {Mention} mention - User or organization mention
   * @param {T} commit - Parsed commit
   * @return {string} Formatted mention URL
   */
  protected abstract formatMention(mention: Mention, commit: T): string

  /**
   * Format an issue or pull request reference.
   *
   * @see {@linkcode Reference}
   *
   * @protected
   * @abstract
   *
   * @param {Reference} ref - Issue or pull request reference
   * @param {T} commit - Parsed commit
   * @return {string} Formatted reference URL
   */
  protected abstract formatReference(ref: Reference, commit: T): string

  /**
   * Format a repository URL.
   *
   * @see {@linkcode Repository}
   *
   * @protected
   * @abstract
   *
   * @param {Repository} repository - Repository instance
   * @return {string} Formatted repository url
   */
  protected abstract formatRepository(repository: Repository): string

  /**
   * Format a repository host URL.
   *
   * @see {@linkcode Repository}
   *
   * @protected
   * @abstract
   *
   * @param {Repository} ctx - Repository instance
   * @return {string} Formatted repository host url
   */
  protected abstract formatRepositoryHost(ctx: Repository): string

  /**
   * Link mentions in a formatted changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   * @abstract
   *
   * @param {string} fmt - Formatted changelog entry
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry with linked mentions
   */
  protected abstract linkMentions(
    fmt: string,
    entry: ChangelogEntry<T>
  ): string

  /**
   * Link issue and pull request references in a formatted changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   * @abstract
   *
   * @param {string} fmt - Formatted changelog entry
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry with linked references
   */
  protected abstract linkReferences(
    fmt: string,
    entry: ChangelogEntry<T>
  ): string

  /**
   * Create a changelog section.
   *
   * @protected
   *
   * @param {string} title - Section title
   * @param {string} text - Section content
   * @return {string} Formatted changelog section
   */
  protected section(title: string, text: string): string {
    return ifelse(
      trim(text),
      this.template('{title}\n\n{text}', { text, title }),
      ''
    )
  }

  /**
   * Micro templating function.
   *
   * Single braces (`{`) are used to identify placeholders. Double braces (`{{`)
   * can be used to encode HTML entities and avoid code injection.
   *
   * Nested placeholders (i.e. `'{phone.{type}}'`) are not supported.
   *
   * @see {@linkcode template}
   *
   * @protected
   *
   * @param {string} tmp - String containing placeholders
   * @param {JsonObject} data - Template data
   * @return {string} Template with placeholders replaced
   */
  protected template(tmp: string, data: JsonObject): string {
    return template(tmp, <TemplateData>data)
  }
}

export default AbstractChangelogFormatter
