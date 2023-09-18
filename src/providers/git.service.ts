/**
 * @file Providers - GitService
 * @module grease/providers/GitService
 */

import { Commit, CommitGrammar } from '#src/models'
import { CommitOptions, GitTagOptions } from '#src/options'
import {
  cast,
  ifelse,
  join,
  pick,
  regexp,
  select,
  sift,
  sort,
  split,
  template,
  timeunix,
  trim,
  tryit,
  type Fn
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import consola from 'consola'
import {
  exec,
  type ExecException,
  type ExecOptions
} from 'node:child_process'
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
      '',
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
      'header',
      '%n%s%n',
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
   * @template T - Parsed commit type
   *
   * @public
   * @async
   *
   * @param {Partial<CommitOptions<T>>?} [opts] - Commit options
   * @return {Promise<T[]>} Parsed commit array
   */
  public async commits<T extends Commit = Commit>(
    opts?: Partial<CommitOptions<T>>
  ): Promise<T[]> {
    const {
      Commit,
      cwd,
      debug,
      from,
      issue_prefixes,
      provider,
      to
    } = await this.validator.validate(new CommitOptions<T>(opts))

    /**
     * String used to separate commit logs.
     *
     * @const {string} LOG_DELIMITER
     */
    const LOG_DELIMITER: string = '--$--'

    /**
     * Raw commit logs.
     *
     * @const {string} logs
     */
    const logs: string = await this.log(sift([
      '--decorate-refs=refs/tags',
      '--decorate=short',
      template('--format=\'{format}{delimiter}\'', {
        delimiter: LOG_DELIMITER,
        format: GitService.RAW_COMMIT_FORMAT
      }),
      join(sift([from, to]), '..'),
      ifelse(cwd === process.cwd(), '', `-- ${cwd}`)
    ]), { cwd, debug })

    /**
     * Parsed commit array.
     *
     * @const {T[]} commits
     */
    const commits: T[] = []

    /**
     * Commit parser grammar.
     *
     * @const {CommitGrammar} grammar
     */
    const grammar: CommitGrammar = new CommitGrammar(provider, issue_prefixes)

    // parse raw commits
    for (let chunk of split(logs, new RegExp(`${regexp(LOG_DELIMITER)}\n?`))) {
      if (!(chunk = trim(chunk))) continue
      commits.push(cast(new Commit(chunk, grammar)))
    }

    return sort(commits, (a, b) => timeunix(b.date) - timeunix(a.date))
  }

  /**
   * Execute a command.
   *
   * Throws if the command fails.
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>} args - Command arguments
   * @param {(ExecOptions & { debug?: boolean })?} [opts={}] - Exec options
   * @return {Promise<string>} Command output
   * @throws {Error} If command fails
   */
  public async exec(
    args: readonly string[],
    opts: ExecOptions & { debug?: boolean } = {}
  ): Promise<string> {
    /**
     * Command to execute.
     *
     * @const {string} command
     */
    const command: string = join(['git', ...args], ' ')

    // debug command
    if (opts.debug) consola.info(`[GitService#${this.exec.name}]`, command)

    // execute command
    const [e, result] = await tryit<
      Fn<[string, ExecOptions], Promise<{ stdout: string }>>,
      ExecException & { stderr: string }
    >(util.promisify(exec))(command, {
      ...opts,
      maxBuffer: Number.POSITIVE_INFINITY,
      shell: process.env.SHELL
    })

    // throw if command failed
    if (e) {
      e.stderr = trim(e.stderr.replace(/^fatal: */, ''))
      throw new Error(e.stderr, { cause: pick(e, ['cmd', 'code']) })
    }

    return trim(result.stdout)
  }

  /**
   * Get commit logs.
   *
   * @see https://git-scm.com/docs/git-log
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>?} [args=[]] - `git log` options
   * @param {(ExecOptions & { debug?: boolean })?} [opts={}] - Exec options
   * @return {Promise<string>} Command output
   */
  public async log(
    args: readonly string[] = [],
    opts: ExecOptions & { debug?: boolean } = {}
  ): Promise<string> {
    return this.exec(['log', ...args], opts)
  }

  /**
   * Get an array containing all git tags in reverse chronological order.
   *
   * @see {@linkcode GitTagOptions}
   *
   * @public
   * @async
   *
   * @param {Partial<GitTagOptions>?} [opts] - Git tag options
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
     * Raw tags.
     *
     * @const {string} tags
     */
    const tags: string = await this.exec([
      'tag',
      '--sort -creatordate',
      template('--list \'{tagprefix}*\'', { tagprefix })
    ], { cwd, debug, env: process.env })

    return select(sift(select(split(tags, '\n'), null, trim)), tag => {
      return unstable
        ? true
        : !semver.parse(tag.replace(tagprefix, ''))!.prerelease.length
    })
  }
}

export default GitService
