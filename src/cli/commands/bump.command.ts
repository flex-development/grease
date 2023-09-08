/**
 * @file Commands - BumpCommand
 * @module grease/commands/BumpCommand
 */

import { ReleaseType } from '#src/enums'
import type { BumpOptions } from '#src/options'
import { BumpService } from '#src/providers'
import type { ReleaseVersion } from '#src/types'
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
  isNumeric,
  select,
  trim,
  type Omit
} from '@flex-development/tutils'

/**
 * Version bump command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  arguments: { description: 'release type or version', syntax: '<release>' },
  description: 'package version bumper',
  examples: [
    ReleaseType.MAJOR,
    ReleaseType.MINOR,
    ReleaseType.PATCH,
    ReleaseType.PREMAJOR,
    ReleaseType.PREMINOR,
    ReleaseType.PREPATCH,
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
   * Parse the `--manifest` flag.
   *
   * @see {@linkcode BumpOptions.manifest}
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
   * @see {@linkcode BumpOptions.preid}
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
   * @see {@linkcode BumpOptions.prestart}
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
   * Parse the `--silent` flag.
   *
   * @see {@linkcode BumpOptions.silent}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'disable logs',
    fallback: { value: false },
    flags: '-s, --silent',
    preset: 'true'
  })
  protected parseSilent(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--write` flag.
   *
   * @see {@linkcode BumpOptions.write}
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
   * @param {Omit<BumpOptions, 'release'>} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run(
    [release]: [ReleaseVersion],
    opts: Omit<BumpOptions, 'release'>
  ): Promise<void> {
    return void (await this.bumper.bump({ ...opts, release }))
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
