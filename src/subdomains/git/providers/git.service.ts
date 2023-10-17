/**
 * @file Providers - GitService
 * @module grease/git/providers/GitService
 */

import { GitOptions } from '#src/git/options'
import { LoggerService } from '#src/log'
import {
  defaults,
  fallback,
  join,
  pick,
  sift,
  trim,
  tryit,
  type Fn,
  type Merge
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import { exec, type ExecException, type ExecOptions } from 'node:child_process'
import util from 'node:util'

/**
 * Git commands provider.
 *
 * @see https://git-scm.com/docs
 *
 * @class
 */
@Injectable()
class GitService {
  /**
   * Create a new git commands service.
   *
   * @see {@linkcode LoggerService}
   *
   * @param {LoggerService} logger - Logger service
   */
  constructor(protected readonly logger: LoggerService) {
    this.logger = logger.withTag('git')
  }

  /**
   * Execute a command.
   *
   * Throws if the command fails.
   *
   * @see {@linkcode ExecOptions}
   * @see {@linkcode GitOptions}
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>} args - Command arguments
   * @param {Merge<ExecOptions, Partial<GitOptions>>?} [opts] - Git exec options
   * @return {Promise<string>} Command output
   * @throws {Error} If command fails
   */
  public async exec(
    args: readonly string[],
    opts?: Merge<ExecOptions, Partial<GitOptions>>
  ): Promise<string> {
    /**
     * Command to execute.
     *
     * @const {string} command
     */
    const command: string = join(sift(['git', ...args]), ' ')

    // debug command
    this.logger.sync(opts).debug(command)

    // execute command
    const [e, result] = await tryit<
      Fn<[string, ExecOptions], Promise<{ stdout: string }>>,
      ExecException & { stderr: string }
    >(util.promisify(exec))(command, defaults(fallback(opts, {}), {
      maxBuffer: Number.POSITIVE_INFINITY,
      shell: process.env.SHELL
    }))

    // throw if command failed
    if (e) {
      this.logger.fail(e.stderr = trim(e.stderr.replace(/^fatal: */, '')))
      throw new Error(e.stderr, { cause: pick(e, ['cmd', 'code']) })
    }

    return trim(result.stdout)
  }

  /**
   * Get commit logs.
   *
   * @see {@linkcode ExecOptions}
   * @see {@linkcode GitOptions}
   * @see https://git-scm.com/docs/git-log
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>?} [args=[]] - Command arguments and options
   * @param {Merge<ExecOptions, Partial<GitOptions>>?} [opts] - Git exec options
   * @return {Promise<string>} Command output
   */
  public async log(
    args: readonly string[] = [],
    opts?: Merge<ExecOptions, Partial<GitOptions>>
  ): Promise<string> {
    return this.exec(['log', ...args], opts)
  }

  /**
   * Get a remote origin url.
   *
   * @see {@linkcode ExecOptions}
   * @see {@linkcode GitOptions}
   *
   * @public
   * @async
   *
   * @param {Merge<ExecOptions, Partial<GitOptions>>?} [opts] - Git exec options
   * @return {Promise<string>} Remote origin url
   */
  public async origin(
    opts?: Merge<ExecOptions, Partial<GitOptions>>
  ): Promise<string> {
    return this.exec(['config', '--get', 'remote.origin.url'], opts)
  }

  /**
   * Update remote refs along with associated objects.
   *
   * @see {@linkcode ExecOptions}
   * @see {@linkcode GitOptions}
   * @see https://git-scm.com/docs/git-push
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>} args - Command arguments and options
   * @param {Merge<ExecOptions, Partial<GitOptions>>?} [opts] - Git exec options
   * @return {Promise<string>} Command output
   */
  public async push(
    args: readonly string[] = [],
    opts?: Merge<ExecOptions, Partial<GitOptions>>
  ): Promise<string> {
    return this.exec(['push', ...args], opts)
  }

  /**
   * Create, list, delete or verify a tag object signed with GPG.
   *
   * @see {@linkcode ExecOptions}
   * @see {@linkcode GitOptions}
   * @see https://git-scm.com/docs/git-tag
   *
   * @public
   * @async
   *
   * @param {ReadonlyArray<string>?} [args=[]] - Command arguments and options
   * @param {Merge<ExecOptions, Partial<GitOptions>>?} [opts] - Git exec options
   * @return {Promise<string>} Command output
   */
  public async tag(
    args: readonly string[] = [],
    opts?: Merge<ExecOptions, Partial<GitOptions>>
  ): Promise<string> {
    return this.exec(['tag', ...args], opts)
  }
}

export default GitService
