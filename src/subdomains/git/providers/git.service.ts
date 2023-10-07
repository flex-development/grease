/**
 * @file Providers - GitService
 * @module grease/git/providers/GitService
 */

import { Commit, Repository } from '#src/git/models'
import {
  GitCommitOptions,
  GitOptions,
  GitTagOptions
} from '#src/git/options'
import { LoggerService, ValidationService } from '#src/providers'
import {
  ifelse,
  join,
  pick,
  regexp,
  select,
  sift,
  split,
  template,
  trim,
  tryit,
  type Fn
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
   * Get an array of parsed commits in reverse chronological order.
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
    opts = await this.validator.validate(new GitCommitOptions<T>(opts))

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
      join(sift([opts.from, opts.to]), '..'),
      ifelse(opts.cwd === process.cwd(), '', `-- ${opts.cwd}`)
    ]), opts)

    return select(
      split(logs, new RegExp(`${regexp(GitService.RAW_COMMIT_DELIMITER)}\n?`)),
      chunk => !!trim(chunk),
      chunk => new opts!.Commit!(trim(chunk), repository, opts)
    )
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
   * @param {ReadonlyArray<string>?} [args=[]] - Command arguments and options
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
   * Create, list, delete or verify a tag object signed with GPG.
   *
   * @see https://git-scm.com/docs/git-tag
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>?} [args=[]] - Command arguments and options
   * @param {Partial<GitOptions>?} [opts={}] - Git exec options
   * @return {Promise<string>} Command output
   */
  public async tag(
    args: readonly string[] = [],
    opts: Partial<GitOptions> = {}
  ): Promise<string> {
    return this.exec(['tag', ...args], opts)
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
    const tags: string = await this.tag([
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
