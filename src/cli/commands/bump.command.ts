/**
 * @file Commands - BumpCommand
 * @module grease/commands/BumpCommand
 */

import { RecommendedBump } from '#src/bump'
import { ReleaseType } from '#src/enums'
import GreaseService from '#src/grease.service'
import { LogObject, LoggerService, UserLogLevel } from '#src/log'
import type { Version } from '#src/models'
import type { ReleaseVersion } from '#src/types'
import {
  CliUtilityService,
  CommandRunner,
  Option,
  Subcommand
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  cast,
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
@Subcommand({
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
    this.logger = logger.withTag('bump')
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
    env: 'GREASE_BUMP_PREID',
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
    env: 'GREASE_BUMP_PRESTART',
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
    description: 'allow unstable recommendations',
    env: 'GREASE_UNSTABLE',
    fallback: { value: false },
    flags: '-u, --unstable',
    preset: 'true'
  })
  protected parseUnstable(val: string): boolean {
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
    description: 'write version bump to file',
    env: 'GREASE_BUMP_WRITE',
    fallback: { value: false },
    flags: '-w, --write',
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
    this.logger.sync(opts)

    /**
     * Version bump operation or query payload.
     *
     * @const {RecommendedBump | Version} payload
     */
    const payload: RecommendedBump | Version = opts.recommend
      ? await this.grease.recommend(opts)
      : await this.grease.bump({ ...opts, release })

    // print payload
    switch (true) {
      case opts.json:
        this.logger.log(new LogObject({
          message: JSON.stringify(payload, null, 2),
          tag: null
        }))
        break
      case payload instanceof RecommendedBump:
        const { bump, breaks, commits, features } = <RecommendedBump>payload
        this.logger.log(bump)
        this.logger.debug('commits:', commits)
        this.logger.debug('breaks:', breaks)
        this.logger.debug('features:', features)
        break
      default:
        this.logger.success((<Version>payload).version)
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

export default BumpCommand
