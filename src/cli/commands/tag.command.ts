/**
 * @file Commands - TagCommand
 * @module grease/commands/TagCommand
 */

import { TagOperation } from '#src/git'
import GreaseService from '#src/grease.service'
import { LogObject, LoggerService, UserLogLevel } from '#src/log'
import {
  CliUtilityService,
  CommandRunner,
  Option,
  Subcommand
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import { includes, isArray, pick, trim } from '@flex-development/tutils'
import type Opts from './tag.command.opts'

/**
 * Git tag command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Subcommand({
  arguments: { description: 'release version', syntax: '[version]' },
  description: 'create and list tags',
  examples: [
    '--list',
    '--sort=\'-creatordate,v:refname\'',
    '-m="release: {tag}" -ps 3.0.0-alpha.1'
  ],
  name: 'tag'
})
class TagCommand extends CommandRunner {
  /**
   * Create a new `tag` command runner.
   *
   * @see {@linkcode CliUtilityService}
   * @see {@linkcode GreaseService}
   * @see {@linkcode LoggerService}
   *
   * @param {CliUtilityService} util - Utilities service
   * @param {GreaseService} grease - Grease runner service
   * @param {LoggerService} logger - Logger service
   */
  constructor(
    protected readonly util: CliUtilityService,
    protected readonly grease: GreaseService,
    protected readonly logger: LoggerService
  ) {
    super()
    this.logger = logger.withTag('tag')
  }

  /**
   * Parse the `--force` flag.
   *
   * @see {@linkcode Opts.force}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'replace an existing tag instead of failing',
    env: 'GREASE_TAG_FORCE',
    fallback: { value: false },
    flags: '-f, --force',
    preset: 'true'
  })
  protected parseForce(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--json` flag.
   *
   * @see {@linkcode Opts.json}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'enable json output',
    env: 'GREASE_JSON',
    fallback: { value: false },
    flags: '-j, --json',
    implies: { level: UserLogLevel.LOG },
    preset: 'true'
  })
  protected parseJson(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--list` flag.
   *
   * @see {@linkcode Opts.list}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'list tags',
    fallback: { value: false },
    flags: '-l, --list',
    preset: 'true'
  })
  protected parseList(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--message` flag.
   *
   * @see {@linkcode Opts.message}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'tag message',
    env: 'GREASE_TAG_MESSAGE',
    fallback: { value: '' },
    flags: '-m, --message <msg>'
  })
  protected parseMessage(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--object` flag.
   *
   * @see {@linkcode Opts.object}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'object new tag will refer to',
    env: 'GREASE_TAG_OBJECT',
    fallback: { value: 'HEAD' },
    flags: '-o, --object <commitish>'
  })
  protected parseObject(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--push` flag.
   *
   * @see {@linkcode Opts.push}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'push tag to remote after successful creation',
    env: 'GREASE_TAG_PUSH',
    fallback: { value: false },
    flags: '-p, --push',
    preset: 'true'
  })
  protected parsePush(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--remote` flag.
   *
   * @see {@linkcode Opts.remote}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'push destination',
    env: 'GREASE_REMOTE',
    fallback: { value: 'origin' },
    flags: '-r, --remote <dest>'
  })
  protected parseRemote(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--sign` flag.
   *
   * @see {@linkcode Opts.sign}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description:
      'create a gpg-signed tag using the default e-mail address\' key if `true`, or the given key if a string',
    env: 'GREASE_TAG_SIGN',
    fallback: { value: false },
    flags: '-s, --sign [opt]',
    preset: 'true'
  })
  protected parseSign(val: string): boolean | string {
    return includes(CliUtilityService.BOOLEAN_CHOICES, val)
      ? this.util.parseBoolean(val)
      : val
  }

  /**
   * Parse the `--sort` flag.
   *
   * @see {@linkcode Opts.sort}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string[]} Parsed option value
   */
  @Option({
    description: 'tag sorting configuration',
    fallback: { value: ['-creatordate'] },
    flags: '--sort <list>',
    implies: { list: true }
  })
  protected parseSort(val: string): string[] {
    return [...this.util.parseList(val)]
  }

  /**
   * Parse the `--unstable` flag.
   *
   * @see {@linkcode Opts.unstable}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: CliUtilityService.BOOLEAN_CHOICES,
    description: 'include unstable tags',
    env: 'GREASE_UNSTABLE',
    fallback: { value: true },
    flags: '-u, --unstable [choice]',
    preset: 'true'
  })
  protected parseUnstable(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--verify` flag.
   *
   * @see {@linkcode Opts.verify}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: CliUtilityService.BOOLEAN_CHOICES,
    description: 'verify gpg signature',
    env: 'GREASE_TAG_VERIFY',
    fallback: {
      description: 'true if signing is enabled, false otherwise',
      value: ''
    },
    flags: '-V, --verify [choice]',
    preset: 'true'
  })
  protected parseVerify(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Execute a tag operation or query.
   *
   * @see {@linkcode Opts}
   *
   * @public
   * @async
   *
   * @param {[string]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run([tag]: [string], opts: Opts): Promise<void> {
    this.logger.sync(opts)

    /**
     * Tag operation or query payload.
     *
     * @const {string[] | TagOperation} payload
     */
    const payload: string[] | TagOperation = opts.list
      ? await this.grease.tags(opts)
      : await this.grease.tag({ ...opts, tag })

    // print payload
    switch (true) {
      case opts.json:
        /**
         * JSON-friendly payload.
         *
         * @const {string} message
         */
        const message: string = JSON.stringify(
          payload instanceof TagOperation ? pick(payload, ['tag']) : payload,
          null,
          2
        )

        this.logger.log(new LogObject({ message, tag: null }))
        break
      case isArray<string>(payload):
        for (const tag of <string[]>payload) this.logger.log(tag)
        break
      default:
        this.logger.success((<TagOperation>payload).tag)
        break
    }

    return void 0
  }

  /**
   * Set the current command.
   *
   * @see {@linkcode command}
   *
   * @public
   * @override
   *
   * @param {commander.Command} cmd - New command instance
   * @return {this} `this` command runner
   */
  public override setCommand(cmd: commander.Command): this {
    cmd.showHelpAfterError()
    return super.setCommand(cmd)
  }
}

export default TagCommand
