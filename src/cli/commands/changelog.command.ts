/**
 * @file Commands - ChangelogCommand
 * @module grease/commands/ChangelogCommand
 */

import GreaseService from '#src/grease.service'
import {
  CliUtilityService,
  CommandRunner,
  Option,
  Subcommand
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import { trim, type EmptyArray } from '@flex-development/tutils'
import type Opts from './changelog.command.opts'

/**
 * Changelog command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Subcommand({
  description: 'generate a changelog from git metadata',
  examples: ['', '--releases=0 --write', '-sw'],
  name: 'changelog'
})
class ChangelogCommand extends CommandRunner {
  /**
   * Create a new `changelog` command runner.
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
   * Parse the `--infile` flag.
   *
   * @see {@linkcode Opts.infile}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'read CHANGELOG from this file',
    env: 'GREASE_CHANGELOG_INFILE',
    fallback: { description: 'CHANGELOG.md given --samefile', value: '' },
    flags: '-i, --infile <path>'
  })
  protected parseInfile(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--outfile` flag.
   *
   * @see {@linkcode Opts.outfile}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'write CHANGELOG to this file',
    env: 'GREASE_CHANGELOG_OUTFILE',
    flags: '-o, --outfile <path>',
    implies: { write: true }
  })
  protected parseOutfile(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--releases` flag.
   *
   * @see {@linkcode Opts.releases}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {number} Parsed option value
   */
  @Option({
    description:
      'number of releases to be generated from the latest. if 0, the entire changelog will be regenerated',
    env: 'GREASE_CHANGELOG_RELEASES',
    fallback: { value: 1 },
    flags: '-r, --releases <count>'
  })
  protected parseReleases(val: string): number {
    return this.util.parseInt(val)
  }

  /**
   * Parse the `--samefile` flag.
   *
   * @see {@linkcode Opts.samefile}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'output content to infile',
    env: 'GREASE_CHANGELOG_SAMEFILE',
    fallback: { value: false },
    flags: '-s, --samefile',
    preset: 'true'
  })
  protected parseSamefile(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--to` flag.
   *
   * @see {@linkcode Opts.to}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'end of commit revision range',
    env: 'GREASE_CHANGELOG_TO',
    fallback: { value: 'HEAD' },
    flags: '-t, --to <commitish>'
  })
  protected parseTo(val: string): string {
    return trim(val)
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
    description: 'include unstable releases',
    env: 'GREASE_UNSTABLE',
    fallback: { value: true },
    flags: '-u, --unstable [choice]',
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
    description: 'write content to outfile instead of process.stdout',
    env: 'GREASE_CHANGELOG_WRITE',
    fallback: { value: false },
    flags: '-w, --write',
    preset: 'true'
  })
  protected parseWrite(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Run a changelog operation.
   *
   * @see {@linkcode Opts}
   *
   * @public
   * @async
   *
   * @param {EmptyArray} args - Parsed command arguments
   * @param {Opts} opts - Parsed command options
   * @return {Promise<void>} Nothing when complete
   */
  public async run(args: EmptyArray, opts: Opts): Promise<void> {
    return void (await this.grease.changelog(opts))
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

export default ChangelogCommand
