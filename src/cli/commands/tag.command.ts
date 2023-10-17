/**
 * @file Commands - TagCommand
 * @module grease/commands/TagCommand
 */

import GreaseService from '#src/grease.service'
import { LoggerService } from '#src/log'
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  at,
  define,
  includes,
  join,
  trim
} from '@flex-development/tutils'
import type Opts from './tag.command.opts'

/**
 * Git tag command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: { description: 'name of tag to create', syntax: '[tagname]' },
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
    choices: CliUtilityService.BOOLEAN_CHOICES,
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
    choices: CliUtilityService.BOOLEAN_CHOICES,
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
    choices: CliUtilityService.BOOLEAN_CHOICES,
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
    env: 'GREASE_TAG_SORT',
    fallback: { value: ['-creatordate'] },
    flags: '--sort <list>',
    implies: { list: true }
  })
  protected parseSort(val: string): string[] {
    return [...this.util.parseList(val)]
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
   * @param {[string?, ...string[]]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run(args: [string?, ...string[]], opts: Opts): Promise<void> {
    switch (opts.list) {
      case true:
        this.logger.log(join(await this.grease.tags(opts), '\n '))
        break
      default:
        await this.grease.tag(define(opts, 'tag', { value: at(args, 0, '') }))
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
