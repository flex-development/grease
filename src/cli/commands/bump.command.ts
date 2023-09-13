/**
 * @file Commands - BumpCommand
 * @module grease/commands/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import type { BumpOptions } from '#src/options'
import { BumpService } from '#src/providers'
import type { RecommendedBump, ReleaseVersion } from '#src/types'
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  DOT,
  cast,
  isFalsy,
  isNumeric,
  select,
  trim,
  type Omit
} from '@flex-development/tutils'
import consola, { LogLevels } from 'consola'

/**
 * Parsed command options.
 *
 * @extends {Omit<BumpOptions,'release'|'silent'>}
 */
interface Opts extends Omit<BumpOptions, 'release' | 'silent'> {
  /**
   * Enable colorized output.
   *
   * @default true
   */
  colors: boolean

  /**
   * Get a version bump recommendation.
   *
   * @default false
   */
  recommend: boolean

  /**
   * Tag prefix to consider when recommending a version bump.
   *
   * @default ''
   */
  tagprefix: string
}

/**
 * Version bump command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: { description: 'release type or version', syntax: '[release]' },
  description: 'version bumper',
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
   * @param {BumpService} bumper - Version bump service
   * @param {CliUtilityService} util - Utilities service
   */
  constructor(
    protected readonly bumper: BumpService,
    protected readonly util: CliUtilityService
  ) {
    super()
  }

  /**
   * Parse the `--colors` flag.
   *
   * @see {@linkcode Opts.colors}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: ['0', '1', '2', '3', 'false', 'true'],
    description: 'enable colorized output',
    env: 'FORCE_COLOR',
    fallback: { value: 1 },
    flags: '-c, --colors [choice]',
    preset: 'true'
  })
  protected parseColors(val: string): boolean {
    return this.util.parseBoolean(val) || !isFalsy(this.util.parseInt(val))
  }

  /**
   * Parse the `--manifest` flag.
   *
   * @see {@linkcode Opts.manifest}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'module id of package manifest or directory',
    fallback: { value: DOT },
    flags: '-m, --manifest <id>'
  })
  protected parseManifest(val: string): string {
    return trim(val)
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
   * Parse the `--tagprefix` flag.
   *
   * @see {@linkcode Opts.tagprefix}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'tag prefix to consider when recommending a version bump',
    fallback: { value: '' },
    flags: '-t, --tagprefix <prefix>'
  })
  protected parseTagprefix(val: string): string {
    return trim(val)
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
    description: 'write version bump to package manifest',
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
   * @see {@linkcode BumpOptions}
   * @see {@linkcode ReleaseVersion}
   *
   * @public
   * @async
   *
   * @param {[ReleaseVersion]} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run(
    [release]: [ReleaseVersion],
    { colors, recommend, tagprefix, ...opts }: Opts
  ): Promise<void> {
    if (!recommend) return void (await this.bumper.bump({ ...opts, release }))

    /**
     * Recommended version bump.
     *
     * @const {RecommendedBump} recommended
     */
    const recommended: RecommendedBump = await this.bumper.recommend({
      tagprefix
    })

    consola.level = LogLevels.debug
    consola.options.formatOptions.colors = colors
    consola.log(recommended.bump)
    consola[colors ? 'debug' : 'log']('commits:', recommended.commits)
    consola[colors ? 'debug' : 'log']('breaks:', recommended.breaks)
    consola[colors ? 'debug' : 'log']('features:', recommended.features)
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
