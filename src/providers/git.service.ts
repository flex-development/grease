/**
 * @file Providers - GitService
 * @module grease/providers/GitService
 */

import type { Commit } from '#src/interfaces'
import { CommitGrammar } from '#src/models'
import { CommitOptions, GitTagOptions } from '#src/options'
import type { BreakingChange, CommitLogField, Trailer } from '#src/types'
import {
  at,
  cast,
  construct,
  fallback,
  fork,
  get,
  ifelse,
  includes,
  isNaN,
  join,
  ksort,
  objectify,
  pick,
  select,
  sift,
  split,
  template,
  trim,
  trimEnd,
  type Construct
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import consola from 'consola'
import { exec, type ExecOptions } from 'node:child_process'
import util from 'node:util'
import semver from 'semver'
import ValidationService from './validation.service'

/**
 * Git operations provider.
 *
 * @see https://git-scm.com/docs
 *
 * @class
 */
@Injectable()
class GitService {
  /**
   * Commit log format.
   *
   * @see https://git-scm.com/docs/git-log#_pretty_formats
   *
   * @public
   * @static
   * @readonly
   * @member {string} RAW_COMMIT_FORMAT
   */
  public static readonly RAW_COMMIT_FORMAT: string = join(
    [
      '%s%n',
      'author.email',
      '%n%ae%n',
      'author.name',
      '%n%an%n',
      'body',
      '%n%b%n',
      'date',
      '%n%cI%n',
      'hash',
      '%n%h%n',
      'sha',
      '%n%H%n',
      'tags',
      '%n%D%n',
      'trailers',
      '%n%(trailers)%n'
    ],
    '-'
  )

  /**
   * Create a git operations service.
   *
   * @param {ValidationService} validator - Validation service
   */
  constructor(protected readonly validator: ValidationService) {}

  /**
   * Get an array of parsed commits.
   *
   * @see {@linkcode CommitOptions}
   *
   * @public
   * @async
   *
   * @param {Partial<CommitOptions>?} [opts] - Commit options
   * @return {Promise<Commit[]>} Parsed commit array
   */
  public async commits(opts?: Partial<CommitOptions>): Promise<Commit[]> {
    const {
      cwd,
      debug,
      from,
      issue_prefixes,
      to
    } = await this.validator.validate(new CommitOptions(opts))

    /**
     * String used to separate commit logs.
     *
     * @const {string} LOG_DELIMITER
     */
    const LOG_DELIMITER: string = '--$--'

    /**
     * Git command arguments.
     *
     * @const {string[]} args
     */
    const args: string[] = sift([
      '--decorate-refs=refs/tags',
      '--decorate=short',
      template('--format=\'{format}{delimiter}\'', {
        delimiter: LOG_DELIMITER,
        format: GitService.RAW_COMMIT_FORMAT
      }),
      join(sift([from, to]), '..'),
      ifelse(cwd === process.cwd(), '', `-- ${cwd}`)
    ])

    /**
     * Raw commit logs.
     *
     * @const {{ stderr: string; stdout: string }} logs
     */
    const logs: { stderr: string; stdout: string } = await this.log(args, {
      cwd,
      debug
    })

    /**
     * Array containing parsed commits.
     *
     * @const {Commit[]} commits
     */
    const commits: Commit[] = []

    /**
     * Commit parser grammar.
     *
     * @const {CommitGrammar} grammar
     */
    const grammar: CommitGrammar = new CommitGrammar()

    // parse raw commits
    for (let chunk of split(logs.stdout, LOG_DELIMITER + '\n')) {
      if (!(chunk = trim(chunk))) continue

      // get commit header and raw fields
      const [[header = ''], raw_fields]: [string[], string[]] = fork(
        split(chunk, /^(?=-.*?-\n*$)/gm),
        raw => !grammar.field.test(raw)
      )

      // extract commit header data
      const {
        groups: {
          breaking = null,
          pr = 'null',
          scope = null,
          subject = '',
          type = ''
        } = {}
      } = pick(grammar.header.exec(header)!, ['groups'])

      /**
       * Commit fields object.
       *
       * @const {Construct<Record<CommitLogField, string>>} fields
       */
      const fields: Construct<Record<CommitLogField, string>> = construct(
        cast<Record<CommitLogField, string>>(
          objectify(
            raw_fields,
            raw => get(grammar.field.exec(raw)!.groups, 'field', ''),
            raw => trim(raw.replace(grammar.field, ''))
          )
        )
      )

      /**
       * Tags associated with commit.
       *
       * @const {string[]} tags
       */
      const tags: string[] = select(
        split(fields.tags, ','),
        tag => !!trim(tag),
        tag => trim(tag.replace(/^tag: */, ''))
      )

      /**
       * Commit message trailers.
       *
       * @const {Trailer[]} trailers
       */
      const trailers: Trailer[] = select(
        [...fields.trailers.matchAll(grammar.trailer)],
        null,
        match => pick(match.groups!, ['token', 'value'])
      )

      /**
       * Breaking changes noted in commit subject and trailers.
       *
       * @const {BreakingChange[]} breaking_changes
       */
      const breaking_changes: BreakingChange[] = select(
        trailers,
        trailer => /^BREAKING[ -]CHANGE/.test(trailer.token),
        trailer => ({ scope: null, subject: trailer.value, type })
      )

      // add subject to breaking changes if breaking change is in subject
      if (breaking && !includes(breaking_changes, subject)) {
        breaking_changes.unshift({ scope, subject, type })
      }

      /**
       * Parsed commit object.
       *
       * @var {Commit} commit
       */
      const commit: Commit = {
        ...fields,
        body: trimEnd(fields.body.replace(fields.trailers, '')),
        breaking: !!breaking_changes.length,
        breaking_changes,
        header: header.replace(/\n$/, ''),
        mentions: select(
          [...chunk.matchAll(grammar.mention)],
          null,
          match => get(match, 'groups.user')!
        ),
        pr: fallback(+pr, null, isNaN),
        references: select(
          [...chunk.matchAll(grammar.reference(issue_prefixes))],
          null,
          match => ({
            action: get(match, 'groups.action', null),
            number: +get(match, 'groups.number', ''),
            owner: get(match, 'groups.owner', null),
            ref: get(match, 'groups.ref', ''),
            repo: get(match, 'groups.repo', null)
          })
        ),
        scope,
        subject,
        tags,
        trailers,
        type,
        version: at(tags, 0, null)
      }

      commits.push(ksort(commit, { deep: true }))
    }

    return commits
  }

  /**
   * Get commit logs.
   *
   * @see https://git-scm.com/docs/git-log
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>} args - `git log` options
   * @param {ExecOptions & { debug?: boolean }} [opts={}] - Exec options
   * @return {Promise<{ stderr: string; stdout: string }>} Command output
   */
  public async log(
    args: readonly string[],
    opts: ExecOptions & { debug?: boolean } = {}
  ): Promise<{ stderr: string; stdout: string }> {
    /**
     * Command to execute.
     *
     * @const {string} command
     */
    const command: string = join(['git', 'log', ...args], ' ')

    // debug git log command
    if (opts.debug) consola.info(`[GitService.${this.log.name}]`, command)

    return util.promisify(exec)(command, {
      ...opts,
      encoding: 'utf8',
      maxBuffer: Number.POSITIVE_INFINITY,
      shell: process.env.SHELL
    })
  }

  /**
   * Get an array containing all git tags in reverse chronological order.
   *
   * @see {@linkcode GitTagOptions}
   *
   * @public
   * @async
   *
   * @param {Partial<GitTagOptions>} [opts] - Git tag options
   * @return {Promise<string[]>} Git tags array
   */
  public async tags(opts?: Partial<GitTagOptions>): Promise<string[]> {
    const {
      cwd,
      debug,
      tagprefix,
      unstable
    } = await this.validator.validate(new GitTagOptions(opts))

    /**
     * Raw commit logs.
     *
     * @const {{ stderr: string; stdout: string }} logs
     */
    const logs: { stderr: string; stdout: string } = await this.log([
      '--decorate-refs=refs/tags',
      '--decorate=short',
      '--format=%D'
    ], { cwd, debug, env: process.env })

    return select(
      select(
        split(logs.stdout, '\n'),
        tag => trim(tag).startsWith(`tag: ${tagprefix}`),
        tag => trim(tag).replace(/^tag: */, '')
      ),
      tag => (
        !!semver.valid(tag = tag.replace(new RegExp(`^${tagprefix}`), '')) &&
        (unstable ? true : !semver.parse(tag)!.prerelease.length)
      )
    )
  }
}

export default GitService
