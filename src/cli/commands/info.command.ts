/**
 * @file Commands - InfoCommand
 * @module grease/commands/InfoCommand
 */

import pkg from '#pkg' assert { type: 'json' }
import GreaseService from '#src/grease.service'
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import { keys, type EmptyArray } from '@flex-development/tutils'
import envinfo from 'envinfo'
import type Opts from './info.command.opts'

/**
 * Environment report command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  description: 'print environment report',
  examples: ['--json', '--markdown'],
  name: 'info'
})
class InfoCommand extends CommandRunner {
  /**
   * Create a new `info` command runner.
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
    conflicts: 'markdown',
    description: 'enable json formatting',
    fallback: { value: false },
    flags: '-j, --json',
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
    conflicts: 'json',
    description: 'enable markdown formatting',
    fallback: { value: false },
    flags: '-m, --markdown',
    preset: 'true'
  })
  protected parseMarkown(val: string): boolean {
    return this.util.parseBoolean(val)
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
    return void this.grease.logger.sync(opts).log(await envinfo.run({
      Binaries: ['Node', 'Yarn', 'npm'],
      System: ['CPU', 'OS', 'Shell'],
      Utilities: ['git'],
      npmPackages: keys(pkg.dependencies)
    }, {
      console: false,
      duplicates: true,
      json: opts.json,
      markdown: opts.markdown,
      showNotFound: true
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
