/**
 * @file Models - Commit
 * @module grease/git/models/Commit
 */

import type { RepositoryProvider } from '#src/git/enums'
import type { ICommit } from '#src/git/interfaces'
import type { CommitGrammarOptions } from '#src/git/options'
import type {
  Author,
  BreakingChange,
  CommitFields,
  Mention,
  Reference,
  Trailer
} from '#src/git/types'
import {
  at,
  cast,
  construct,
  defaults,
  get,
  ifelse,
  includes,
  objectify,
  pick,
  select,
  split,
  trim,
  trimEnd,
  unique,
  type Nullable,
  type Simplify
} from '@flex-development/tutils'
import CommitGrammar from './commit-grammar.model'
import Repository from './repository.model'

/**
 * Parsed commit model.
 *
 * @class
 * @implements {ICommit}
 */
class Commit implements ICommit {
  /**
   * Raw commit chunk.
   *
   * @protected
   * @readonly
   * @instance
   * @member {string} chunk
   */
  protected readonly chunk: string

  /**
   * Raw commit fields object.
   *
   * @see {@linkcode CommitFields}
   *
   * @protected
   * @readonly
   * @instance
   * @member {CommitFields} fields
   */
  protected readonly fields: CommitFields

  /**
   * Commit grammar instance.
   *
   * @see {@linkcode CommitGrammar}
   *
   * @public
   * @readonly
   * @instance
   * @member {CommitGrammar} grammar
   */
  public readonly grammar: CommitGrammar

  /**
   * Repository provider name.
   *
   * @public
   * @readonly
   * @instance
   * @member {RepositoryProvider} provider
   */
  public readonly provider: RepositoryProvider

  /**
   * Parent repository.
   *
   * @public
   * @readonly
   * @instance
   * @member {Repository} repository
   */
  public readonly repository: Repository

  /**
   * Create a new parsed commit.
   *
   * @param {Buffer | Commit | string} chunk - Raw commit chunk or parsed commit
   * @param {Repository?} [repository=new Repository()] - Parent repository
   * @param {Partial<CommitGrammarOptions>?} [grammar] - Commit grammar options
   */
  constructor(
    chunk: Buffer | Commit | string,
    repository: Repository = new Repository(),
    grammar?: Partial<CommitGrammarOptions>
  ) {
    this.chunk = (chunk = chunk.toString()).padEnd(chunk.length + 1, '\n')
    if (!trim(this.chunk)) throw new Error('empty commit chunk')

    // set repository and provider
    this.repository = get(chunk, 'repository', repository)
    this.provider = this.repository.provider

    // set commit grammar
    this.grammar = get(chunk, 'grammar', new CommitGrammar({
      ...grammar,
      provider: this.provider
    }))

    // init commit fields object
    this.fields = construct(cast<CommitFields>(objectify(
      [...this.chunk.matchAll(this.grammar.field)],
      match => get(match, 'groups.field', ''),
      match => trim(get(match, 'groups.value', ''))
    )))

    // add header data to commit fields object
    this.fields = defaults(
      this.fields,
      pick(get(this.grammar.header.exec(this.fields.header), 'groups')!, [
        'breaking',
        'scope',
        'subject',
        'type'
      ]),
      {
        breaking: '',
        scope: '',
        subject: '',
        type: ''
      }
    )

    // remove extra chunk padding
    this.chunk = this.chunk.slice(0, -1)
  }

  /**
   * Commit author details.
   *
   * @see {@linkcode Author}
   *
   * @public
   *
   * @return {Author} Commit author object
   */
  public get author(): Author {
    return this.fields.author
  }

  /**
   * Commit body text.
   *
   * @public
   *
   * @return {string} Commit body
   */
  public get body(): string {
    return trimEnd(this.fields.body.replace(this.fields.trailers, ''))
  }

  /**
   * Commit contains breaking changes?
   *
   * @public
   *
   * @return {boolean} Boolean indicating commits contains breaking changes
   */
  public get breaking(): boolean {
    return this.breaks.length > 0
  }

  /**
   * Breaking changes noted in {@linkcode header} and {@linkcode trailers}.
   *
   * @see {@linkcode BreakingChange}
   *
   * @public
   *
   * @return {BreakingChange[]} Breaking changes array
   */
  public get breaks(): BreakingChange[] {
    return unique(select(
      [
        {
          token: (this.fields.breaking && 'BREAKING-CHANGE').toString(),
          value: this.subject
        },
        ...this.trailers
      ],
      trailer => /^BREAKING[ -]CHANGE/.test(trailer.token),
      trailer => ({
        date: this.date,
        scope: this.scope,
        subject: trailer.value,
        type: this.type
      })
    ))
  }

  /**
   * Commit date in strict ISO 8601 format (`%cI`).
   *
   * @see https://git-scm.com/docs/pretty-formats/2.21.0
   *
   * @public
   *
   * @return {string} Commit date
   */
  public get date(): string {
    return this.fields.date
  }

  /**
   * Abbreviated commit {@linkcode sha}.
   *
   * @public
   *
   * @return {string} Commit hash
   */
  public get hash(): string {
    return this.fields.hash
  }

  /**
   * Commit {@linkcode type}, {@linkcode scope}, breaking change indicator, and
   * {@linkcode subject}.
   *
   * @public
   *
   * @return {string} Commit header text
   */
  public get header(): string {
    return this.fields.header
  }

  /**
   * Users and/or organizations mentioned in commit subject.
   *
   * @see {@linkcode Mention}
   *
   * @return {Mention[]} Mentions array
   */
  public get mentions(): Mention[] {
    return select(
      [...this.chunk.matchAll(this.grammar.mention)],
      null,
      match => <Mention>get(match, 'groups.mention')
    )
  }

  /**
   * Issue and pull request references.
   *
   * @see {@linkcode Reference}
   *
   * @public
   *
   * @return {Reference[]} Reference array
   */
  public get references(): Reference[] {
    return select([...this.chunk.matchAll(this.grammar.reference)], null, m => {
      const {
        action,
        number,
        owner,
        repo,
        prefix
      } = defaults(get(m, 'groups', <Record<string, string>>{}), {
        action: <Reference['action']>null,
        number: 'null',
        owner: <Reference['owner']>null,
        prefix: '',
        repo: <Reference['repo']>null
      })

      /**
       * Boolean indicating if reference prefix is an issue reference prefix.
       *
       * @const {boolean} issue
       */
      const issue: boolean = includes(this.grammar.options.issues, prefix)

      /**
       * Boolean indicating if reference prefix is a pull request reference
       * prefix.
       *
       * @const {boolean} pr
       */
      const pr: boolean = includes(this.grammar.options.pr, prefix)

      return {
        action,
        number: +number,
        owner,
        prefix,
        ref: prefix + number,
        repo,
        type: ifelse(issue && pr, '*', ifelse(issue, 'issue', 'pr'))
      }
    })
  }

  /**
   * Commit scope.
   *
   * @public
   *
   * @return {Nullable<string>} Commit scope or `null`
   */
  public get scope(): Nullable<string> {
    return ifelse(this.fields.scope, this.fields.scope, null)
  }

  /**
   * Commit sha.
   *
   * @public
   *
   * @return {string} Commit sha
   */
  public get sha(): string {
    return this.fields.sha
  }

  /**
   * Commit subject.
   *
   * @public
   *
   * @return {string} Commit subject text
   */
  public get subject(): string {
    return this.fields.subject
  }

  /**
   * Tags associated with commit.
   *
   * @public
   *
   * @return {string[]} Tags array
   */
  public get tags(): string[] {
    return select(
      select(
        split(this.fields.tags, ','),
        tag => !!tag.length,
        tag => trim(tag.replace(/^tag: */, ''))
      ),
      tag => this.grammar.tag.test(tag)
    )
  }

  /**
   * Commit message trailers.
   *
   * @public
   *
   * @return {Trailer[]} Trailers array
   */
  public get trailers(): Trailer[] {
    return select(
      [...this.fields.trailers.matchAll(this.grammar.trailer)],
      null,
      match => pick(match.groups!, ['token', 'value'])
    )
  }

  /**
   * Commit type.
   *
   * @public
   *
   * @return {string} Commit type
   */
  public get type(): string {
    return this.fields.type
  }

  /**
   * Tagged commit version.
   *
   * @public
   *
   * @return {Nullable<string>} First tag in {@linkcode tags} or `null`
   */
  public get version(): Nullable<string> {
    return at(this.tags, 0, null)
  }

  /**
   * Get a JSON-serializable commit object.
   *
   * @template U - JSON-serializable commit type
   *
   * @public
   *
   * @return {Simplify<U>} JSON-serializable commit
   */
  public toJSON<U extends ICommit = ICommit>(): Simplify<U> {
    return <Simplify<U>>{
      author: this.author,
      body: this.body,
      breaking: this.breaking,
      breaks: this.breaks,
      date: this.date,
      hash: this.hash,
      header: this.header,
      mentions: this.mentions,
      references: this.references,
      scope: this.scope,
      sha: this.sha,
      subject: this.subject,
      tags: this.tags,
      trailers: this.trailers,
      type: this.type,
      version: this.version
    }
  }

  /**
   * Get `this` raw commit.
   *
   * @public
   *
   * @return {string} Raw commit string
   */
  public toString(): string {
    return this.chunk
  }
}

export default Commit
