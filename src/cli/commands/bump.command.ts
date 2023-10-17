/**
 * @file Commands - BumpCommand
 * @module grease/commands/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import GreaseService from '#src/grease.service'
import type { ReleaseVersion } from '#src/types'
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  cast,
  define,
  ifelse,
  isNumeric,
  select,
  trim
} from '@flex-development/tutils'
import type Opts from './bump.command.opts'

/**
 * Version bump command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: { description: 'release type or version', syntax: '[release]' },
  description: 'execute a version bump, or get a recommendation',
  examples: [
    ReleaseType.MAJOR,
    ReleaseType.MINOR,
    ReleaseType.PATCH,
    ReleaseType.PREMAJOR,
    ReleaseType.PREMINOR,
    ReleaseType.PREPATCH,
    '--recommend',
    '3.1.3'
  ],
  name: 'bump'
})
class BumpCommand extends CommandRunner {
  /**
   * Create a new `bump` command runner.
   *
   * @see {@linkcode CliUtilityService}
   * @see {@linkcode GreaseService}
   *
   * @param {CliUtilityService} util - Utilities service
   * @param {GreaseService} grease - Grease runner service
   */
  constructor(
    protected readonly util: CliUtilityService,
    protected readonly grease: GreaseService
  ) {
    super()
  }

  /**
   * Parse the `--preid` flag.
   *
   * @see {@linkcode Opts.preid}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'prerelease identifier',
    flags: '--preid <id>'
  })
  protected parsePreid(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--prestart` flag.
   *
   * @see {@linkcode Opts.prestart}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {0 | 1} Parsed option value
   */
  @Option({
    choices: select(CliUtilityService.BOOLEAN_CHOICES, isNumeric),
    description: 'base to be used for prerelease identifier',
    fallback: { value: 1 },
    flags: '--prestart <start>'
  })
  protected parsePrestart(val: string): 0 | 1 {
    return cast(this.util.parseInt(val))
  }

  /**
   * Parse the `--recommend` flag.
   *
   * @see {@linkcode Opts.recommend}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'get a version bump recommendation',
    fallback: { value: false },
    flags: '-r, --recommend',
    preset: 'true'
  })
  protected parseRecommend(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--write` flag.
   *
   * @see {@linkcode Opts.write}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: CliUtilityService.BOOLEAN_CHOICES,
    description: 'write version bump to file',
    fallback: { value: true },
    flags: '-w, --write [choice]',
    preset: 'true'
  })
  protected parseWrite(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Run the version bump operation.
   *
   * @see {@linkcode Opts}
   * @see {@linkcode ReleaseVersion}
   *
   * @public
   * @async
   *
   * @param {[ReleaseVersion]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run([release]: [ReleaseVersion], opts: Opts): Promise<void> {
    define(opts, 'release', { value: release })
    await this.grease[ifelse(opts.recommend, 'recommend', 'bump')](cast(opts))
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

export default BumpCommand
