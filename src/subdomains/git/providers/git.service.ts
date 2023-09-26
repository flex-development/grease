/**
 * @file Providers - GitService
 * @module grease/git/providers/GitService
 */

import type { ICommit } from '#src/git/interfaces'
import { Commit, Repository } from '#src/git/models'
import {
  GitCommitOptions,
  GitOptions,
  GitTagOptions
} from '#src/git/options'
import { LoggerService, ValidationService } from '#src/providers'
import {
  at,
  ifelse,
  isNull,
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
  type Fn,
  type Nullable
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import { exec, type ExecException, type ExecOptions } from 'node:child_process'
import util from 'node:util'
import semver from 'semver'

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
   * String used to separate commit logs.
   *
   * @public
   * @static
   * @readonly
   * @member {string} RAW_COMMIT_DELIMITER
   */
  public static readonly RAW_COMMIT_DELIMITER: string = join([
    '--',
    '$',
    '--'
  ], '')

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
  public static readonly RAW_COMMIT_FORMAT: string = join([
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
  ], '-')

  /**
   * Create a new git operations service.
   *
   * @see {@linkcode LoggerService}
   * @see {@linkcode ValidationService}
   *
   * @param {LoggerService} logger - Logger service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly logger: LoggerService,
    protected readonly validator: ValidationService
  ) {
    this.logger = logger.withTag('git')
  }

  /**
   * Get an array of parsed commits.
   *
   * @see {@linkcode GitCommitOptions}
   *
   * @template T - Parsed commit type
   *
   * @public
   * @async
   *
   * @param {Partial<GitCommitOptions<T>>?} [opts] - Commit options
   * @return {Promise<T[]>} Parsed commit array
   */
  public async commits<T extends Commit = Commit>(
    opts?: Partial<GitCommitOptions<T>>
  ): Promise<T[]> {
    const {
      Commit,
      cwd,
      from,
      grammar,
      to
    } = await this.validator.validate(opts = new GitCommitOptions<T>(opts))

    /**
     * Repository instance.
     *
     * @const {Repository} repository
     */
    const repository: Repository = new Repository(await this.origin(opts))

    /**
     * Raw commit logs.
     *
     * @const {string} logs
     */
    const logs: string = await this.log(sift([
      '--decorate-refs=refs/tags',
      '--decorate=short',
      template('--format=\'{format}{delimiter}\'', {
        delimiter: GitService.RAW_COMMIT_DELIMITER,
        format: GitService.RAW_COMMIT_FORMAT
      }),
      join(sift([from, to]), '..'),
      ifelse(cwd === process.cwd(), '', `-- ${cwd}`)
    ]), opts)

    return sort(select(
      split(logs, new RegExp(`${regexp(GitService.RAW_COMMIT_DELIMITER)}\n?`)),
      chunk => !!trim(chunk),
      chunk => new Commit(trim(chunk), repository, grammar)
    ), (a, b) => timeunix(b.date) - timeunix(a.date))
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
   * @param {Partial<GitOptions>?} [opts={}] - Git exec options
   * @return {Promise<string>} Command output
   * @throws {Error} If command fails
   */
  public async exec(
    args: readonly string[],
    opts: Partial<GitOptions> = {}
  ): Promise<string> {
    /**
     * Command to execute.
     *
     * @const {string} command
     */
    const command: string = join(['git', ...args], ' ')

    // debug command
    this.logger.sync(opts).debug(command)

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
   * @param {Partial<GitOptions>?} [opts={}] - Git exec options
   * @return {Promise<string>} Command output
   */
  public async log(
    args: readonly string[] = [],
    opts: Partial<GitOptions> = {}
  ): Promise<string> {
    return this.exec(['log', ...args], opts)
  }

  /**
   * Get a remote origin url.
   *
   * @public
   * @async
   *
   * @param {Partial<GitOptions>?} [opts={}] - Git exec options
   * @return {Promise<string>} Remote origin url
   */
  public async origin(opts?: Partial<GitOptions>): Promise<string> {
    return this.exec(['config', '--get', 'remote.origin.url'], opts)
  }

  /**
   * Get the name of the oldest tag containing `commit`.
   *
   * @see {@linkcode GitTagOptions}
   * @see {@linkcode ICommit}
   *
   * @public
   * @async
   *
   * @param {Pick<ICommit, 'sha'>} commit - Commit to find
   * @param {Partial<GitTagOptions>} [opts] - Search options
   * @return {Promise<Nullable<string>>} Tag containing `commit` or `null`
   * @throws {Error}
   */
  public async parent(
    commit: Pick<ICommit, 'sha'>,
    opts?: Partial<GitTagOptions>
  ): Promise<Nullable<string>> {
    opts = await this.validator.validate(new GitTagOptions(opts))

    // get chronological list of tags containing commit
    const [e, tags] = await tryit(this.exec.bind(this))([
      'tag',
      '--sort creatordate',
      template('--list \'{tagprefix}*\'', opts),
      template('--contains {sha}', commit)
    ], opts)

    // throw fatal error
    /* c8 ignore next */ if (e && !/no such commit/.test(e.message)) throw e

    return ifelse(isNull(e) && tags, at(split(tags, '\n'), 0), null)
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
    opts = await this.validator.validate(new GitTagOptions(opts))

    /**
     * Raw tags.
     *
     * @const {string} tags
     */
    const tags: string = await this.exec([
      'tag',
      '--sort -creatordate',
      template('--list \'{tagprefix}*\'', opts)
    ], opts)

    return select(sift(select(split(tags, '\n'), null, trim)), tag => {
      return opts!.unstable
        ? true
        : !semver.parse(tag.replace(opts!.tagprefix!, ''))!.prerelease.length
    })
  }
}

export default GitService
