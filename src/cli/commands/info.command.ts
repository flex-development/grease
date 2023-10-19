/**
 * @file Commands - InfoCommand
 * @module grease/commands/InfoCommand
 */

import pkg from '#pkg' assert { type: 'json' }
import { LogObject, LoggerService, UserLogLevel } from '#src/log'
import {
  CliUtilityService,
  CommandRunner,
  Option,
  Subcommand
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  alphabetize,
  cast,
  identity,
  ifelse,
  keys,
  pick,
  sift,
  type EmptyArray
} from '@flex-development/tutils'
import envinfo from 'envinfo'
import type Opts from './info.command.opts'

/**
 * Environment report command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Subcommand({
  description: 'get an environment report',
  examples: ['--json', '--markdown'],
  name: 'info'
})
class InfoCommand extends CommandRunner {
  /**
   * Create a new `info` command runner.
   *
   * @see {@linkcode CliUtilityService}
   * @see {@linkcode LoggerService}
   *
   * @param {CliUtilityService} util - Utilities service
   * @param {LoggerService} logger - Logger service
   */
  constructor(
    protected readonly util: CliUtilityService,
    protected readonly logger: LoggerService
  ) {
    super()
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
    conflicts: ['markdown'],
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
   * Parse the `--markdown` flag.
   *
   * @see {@linkcode Opts.markdown}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    conflicts: ['json'],
    description: 'enable markdown formatting',
    fallback: { value: false },
    flags: '-m, --markdown',
    preset: 'true'
  })
  protected parseMarkown(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--pm` flag.
   *
   * @see {@linkcode Opts.pm}
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {'npm' | 'pnpm' | 'Yarn'} Parsed option value
   */
  @Option({
    choices: ['npm', 'pnpm', 'yarn'],
    description: 'package manager name',
    flags: '-p, --pm <package-manager>'
  })
  protected parsePackageManager(val: string): 'npm' | 'pnpm' | 'Yarn' {
    return cast(ifelse(val === 'yarn', 'Yarn', val))
  }

  /**
   * Print local environment information.
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
    return void this.logger.sync(opts).log(new LogObject({
      message: await envinfo.run({
        Binaries: sift(['Node', opts.pm]),
        System: ['OS', 'Shell'],
        Utilities: ['git'],
        npmPackages: alphabetize([
          ...keys(pkg.dependencies),
          ...keys(pick(pkg.devDependencies, ['typescript']))
        ], identity)
      }, {
        console: false,
        duplicates: true,
        json: opts.json,
        markdown: opts.markdown,
        showNotFound: true
      }),
      tag: null
    }))
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

export default InfoCommand
