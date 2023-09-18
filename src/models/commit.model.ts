/**
 * @file Models - Commit
 * @module grease/models/Commit
 */

import type { ICommit } from '#src/interfaces'
import type {
  Author,
  BreakingChange,
  CommitFields,
  Reference,
  Trailer
} from '#src/types'
import {
  at,
  cast,
  construct,
  defaults,
  get,
  ifelse,
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
   * Create a new parsed commit.
   *
   * @param {Buffer | Commit | string} chunk - Raw commit chunk or parsed commit
   * @param {CommitGrammar?} [grammar=new CommitGrammar()] - Commit grammar
   */
  constructor(
    chunk: Buffer | Commit | string,
    grammar: CommitGrammar = new CommitGrammar()
  ) {
    this.chunk = (chunk = chunk.toString()).padEnd(chunk.length + 1, '\n')
    this.grammar = get(chunk, 'grammar', grammar)

    // throw if commit chunk is empty
    if (!trim(this.chunk)) throw new Error('empty commit chunk')

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
        'pr',
        'scope',
        'subject',
        'type'
      ]),
      {
        breaking: '',
        pr: 'null',
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
   * Breaking changes noted in {@linkcode subject} and {@linkcode trailers}.
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
        this.fields.breaking
          ? {
            pr: this.pr,
            scope: this.scope,
            token: 'BREAKING-CHANGE',
            type: this.type,
            value: this.subject
          }
          : <Trailer>{ token: this.fields.breaking },
        ...this.trailers
      ],
      trailer => /^BREAKING[ -]CHANGE/.test(trailer.token),
      trailer => ({
        mentions: this.mentions,
        pr: get(trailer, 'pr', null),
        scope: get(trailer, 'scope', null),
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
   * Users mentioned in commit.
   *
   * @public
   *
   * @return {string[]} Mentions array
   */
  public get mentions(): string[] {
    return select(
      [...this.chunk.matchAll(this.grammar.mention)],
      null,
      match => get(match, 'groups.user')!
    )
  }

  /**
   * Pull request number.
   *
   * @public
   *
   * @return {Nullable<number>} Pull request number or `null`
   */
  public get pr(): Nullable<number> {
    return cast(JSON.parse(this.fields.pr))
  }

  /**
   * Issue and/or pull request references.
   *
   * @see {@linkcode Reference}
   *
   * @public
   *
   * @return {Reference[]} Reference array
   */
  public get references(): Reference[] {
    return select(
      [...this.chunk.matchAll(this.grammar.reference)],
      null,
      match => ({
        action: get(match, 'groups.action', null),
        number: JSON.parse(get(match, 'groups.number', 'null')),
        owner: get(match, 'groups.owner', null),
        ref: get(match, 'groups.ref', ''),
        repo: get(match, 'groups.repo', null)
      })
    )
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
      split(this.fields.tags, ','),
      tag => !!tag.length,
      tag => trim(tag.replace(/^tag: */, ''))
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
   * @public
   *
   * @return {Simplify<ICommit>} JSON-serializable commit
   */
  public toJSON(): Simplify<ICommit> {
    return {
      author: this.author,
      body: this.body,
      breaking: this.breaking,
      breaks: this.breaks,
      date: this.date,
      hash: this.hash,
      header: this.header,
      mentions: this.mentions,
      pr: this.pr,
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
