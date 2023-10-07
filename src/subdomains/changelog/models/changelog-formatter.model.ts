/**
 * @file Models - ChangelogFormatter
 * @module grease/changelog/models/ChangelogFormatter
 */

import type {
  BreakingChange,
  Commit,
  Mention,
  Reference,
  Repository
} from '#src/git'
import {
  fallback,
  get,
  ifelse,
  isNull,
  join,
  reduce,
  select,
  sift,
  trim,
  type Optional
} from '@flex-development/tutils'
import type ChangelogEntry from './changelog-entry.model'
import AbstractChangelogFormatter from './changelog-formatter.abstract'
import type CommitGroup from './commit-group.model'

/**
 * Changelog formatter.
 *
 * @see {@linkcode AbstractChangelogFormatter}
 * @see {@linkcode Commit}
 *
 * @template T - Parsed commit type
 *
 * @class
 * @extends {AbstractChangelogFormatter<T>}
 */
class ChangelogFormatter<T extends Commit = Commit>
  extends AbstractChangelogFormatter<T> {
  /**
   * Format a breaking change note.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   *
   * @param {BreakingChange} brk - Breaking change object
   * @return {string} Formatted breaking change note
   */
  protected formatBreakingChange(brk: BreakingChange): string {
    return this.template('- {brk}', {
      brk: ifelse(
        brk.scope,
        this.template('**{scope}:** {subject}', brk),
        brk.subject
      )
    })
  }

  /**
   * Format breaking change notes.
   *
   * @see {@linkcode BreakingChange}
   *
   * @protected
   *
   * @param {ReadonlyArray<BreakingChange>} breaks - Breaking change objects
   * @return {string} Formatted breaking change notes
   */
  protected formatBreakingChanges(breaks: readonly BreakingChange[]): string {
    return this.section(
      '### ⚠ BREAKING CHANGES',
      this.template('{breaks}', {
        breaks: reduce(breaks, (acc, brk) => {
          return this.template('{acc}{newline}{brk}', {
            acc,
            brk: this.formatBreakingChange(brk),
            newline: ifelse(acc, '\n', '')
          })
        }, '')
      })
    )
  }

  /**
   * Format a commit message.
   *
   * @protected
   *
   * @param {T} commit - Parsed commit
   * @return {string} Formatted commit message
   */
  protected formatCommit(commit: T): string {
    return this.template('- [[`{hash}`]({url})] {scope}{subject}', {
      hash: commit.hash,
      scope: ifelse(commit.scope, `**${commit.scope}:** `, ''),
      subject: commit.subject,
      url: this.formatCommitUrl(commit)
    })
  }

  /**
   * Format a commit group.
   *
   * @see {@linkcode CommitGroup}
   *
   * @protected
   *
   * @param {CommitGroup<T>} group - Parsed commit group
   * @return {string} Formatted commit group
   */
  protected formatCommitGroup(group: CommitGroup<T>): string {
    return this.section(
      this.template('### {section}', { section: group.section }),
      ifelse(group.hidden, '', this.template('{commits}', {
        commits: reduce(group.commits, (acc, commit) => {
          return this.template('{acc}{commit}\n', {
            acc,
            commit: this.formatCommit(commit)
          })
        }, '')
      }))
    )
  }

  /**
   * Format a commit URL.
   *
   * @protected
   *
   * @param {T} commit - Parsed commit
   * @return {string} Formatted commit URL
   */
  protected formatCommitUrl(commit: T): string {
    return this.template('{repository}/{keyword}/{sha}', {
      keyword: commit.repository.keywords.commit,
      repository: this.formatRepository(commit.repository),
      sha: commit.sha
    })
  }

  /**
   * Format a changelog entry comparison url.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry comparison url
   */
  protected formatCompareUrl(entry: ChangelogEntry<T>): string {
    return this.template('{repository}/compare/{previous}...{release}', {
      previous: entry.previous,
      release: ifelse(
        entry.version.build.length,
        entry.key.sha,
        entry.release
      ),
      repository: this.formatRepository(entry.key.repository)
    })
  }

  /**
   * Format a changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @public
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry
   */
  public formatEntry(entry: ChangelogEntry<T>): string {
    return this.linkMentions(this.linkReferences(this.section(
      this.formatEntryTitle(entry),
      this.template('{breaks}{newline}{groups}', {
        breaks: this.formatBreakingChanges(entry.breaks),
        groups: reduce(select(entry.groups, group => !group.hidden), (
          acc,
          group,
          i,
          arr
        ) => {
          return this.template('{acc}{group}{newline}', {
            acc,
            group: this.formatCommitGroup(group),
            newline: '\n'.repeat(ifelse(i === arr.length - 1, 0, 1))
          })
        }, ''),
        newline: ifelse(entry.breaks.length, '\n\n', '')
      })
    ), entry), entry)
  }

  /**
   * Format a changelog entry title.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   *
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry title
   */
  protected formatEntryTitle(entry: ChangelogEntry<T>): string {
    return this.template(
      this.template('## {header} ({date})', {
        date: entry.date,
        header: ifelse(entry.previous, '[{release}]({compare})', '{release}')
      }),
      {
        compare: this.formatCompareUrl(entry),
        release: entry.release
      }
    )
  }

  /**
   * Format a mention.
   *
   * @see {@linkcode Mention}
   *
   * @protected
   *
   * @param {Mention} mention - User or organization mention
   * @param {T} commit - Parsed commit
   * @return {string} Formatted mention URL
   */
  protected formatMention(mention: Mention, commit: T): string {
    return this.template('[{mention}]({host}/{user})', {
      host: this.formatRepositoryHost(commit.repository),
      mention,
      user: mention.slice(1)
    })
  }

  /**
   * Format an issue or pull request reference.
   *
   * @see {@linkcode Reference}
   *
   * @protected
   *
   * @param {Reference} ref - Issue or pull request reference
   * @param {T} commit - Parsed commit
   * @return {string} Formatted reference URL
   */
  protected formatReference(ref: Reference, commit: T): string {
    return trim(this.template('{action} [{ref}]({repo}/{keyword}/{number})', {
      action: fallback(ref.action, '', isNull),
      keyword: get(
        commit.repository.keywords,
        ref.type,
        commit.repository.keywords.issue
      ),
      number: ref.number,
      ref: ref.ref,
      repo: this.formatRepository(commit.repository)
    }))
  }

  /**
   * Format a repository URL.
   *
   * @see {@linkcode Repository}
   *
   * @protected
   *
   * @param {Repository} repository - Repository instance
   * @return {string} Formatted repository url
   */
  protected formatRepository(repository: Repository): string {
    return this.template('{host}/{owner}/{repo}', {
      host: this.formatRepositoryHost(repository),
      owner: repository.owner,
      repo: repository.repo
    })
  }

  /**
   * Format a repository host URL.
   *
   * @see {@linkcode Repository}
   *
   * @protected
   *
   * @param {Repository} ctx - Repository instance
   * @return {string} Formatted repository host url
   */
  protected formatRepositoryHost(ctx: Repository): string {
    return this.template('https://{host}', {
      host: get(ctx, 'host', get(ctx, 'repository.host', null))
    })
  }

  /**
   * Link mentions in a formatted changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   *
   * @param {string} fmt - Formatted changelog entry
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry with linked mentions
   */
  protected linkMentions(fmt: string, entry: ChangelogEntry<T>): string {
    return fmt.replaceAll(entry.key.grammar.mention, match => {
      /**
       * Mention match, if any.
       *
       * @const {Optional<Mention>} mention
       */
      const mention: Optional<Mention> = entry.mentions.find(mention => {
        return mention === match
      })

      return ifelse(mention, this.formatMention(mention!, entry.key), match)
    })
  }

  /**
   * Link issue and pull request references in a formatted changelog entry.
   *
   * @see {@linkcode ChangelogEntry}
   *
   * @protected
   *
   * @param {string} fmt - Formatted changelog entry
   * @param {ChangelogEntry<T>} entry - Changelog entry object
   * @return {string} Formatted changelog entry with linked references
   */
  protected linkReferences(fmt: string, entry: ChangelogEntry<T>): string {
    return fmt.replaceAll(entry.key.grammar.reference, match => {
      /**
       * Reference object match, if any.
       *
       * @const {Optional<Reference>} ref
       */
      const ref: Optional<Reference> = entry.references.find(ref => {
        return join(sift([ref.action, ref.ref]), ' ') === match
      })

      return ifelse(ref, this.formatReference(ref!, entry.key), match)
    })
  }
}

export default ChangelogFormatter
