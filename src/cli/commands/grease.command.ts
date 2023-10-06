/**
 * @file Commands - GreaseCommand
 * @module grease/commands/GreaseCommand
 */

import pkg from '#pkg' assert { type: 'json' }
import type { GreaseConfig } from '#src/config'
import GreaseService from '#src/grease.service'
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option,
  Program
} from '@flex-development/nest-commander'
import type * as commander from '@flex-development/nest-commander/commander'
import {
  DOT,
  cast,
  fallback,
  get,
  includes,
  isFalsy,
  keys,
  lowercase,
  set,
  trim,
  type EmptyObject,
  type ObjectCurly
} from '@flex-development/tutils'
import BumpCommand from './bump.command'
import InfoCommand from './info.command'

/**
 * Main command runner.
 *
 * @class
 * @extends {CommandRunner}
 */
@Command({
  description: lowercase(pkg.description),
  examples: [],
  name: GreaseService.NAME,
  root: true,
  subcommands: [BumpCommand, InfoCommand]
})
class GreaseCommand extends CommandRunner {
  /**
   * Create a new `grease` command runner.
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
   * Merge a configuration object into command option values.
   *
   * @protected
   *
   * @param {commander.Command} cmd - Command instance
   * @param {ObjectCurly} config - Configuration object to merge
   * @return {void} Nothing when complete
   */
  protected mergeConfig(cmd: commander.Command, config: ObjectCurly): void {
    /**
     * Configuration data for {@linkcode cmd}.
     *
     * @const {ObjectCurly} data
     */
    const data: ObjectCurly = get(config, cmd.name(), config)

    // override cli defaults + pass config-only options
    for (const key of keys(cmd.opts())) {
      switch (fallback(cmd.getOptionValueSource(key), 'default')) {
        case 'default':
          cmd.setOptionValueWithSource(key, get(data, key), 'config')
          break
        default:
          continue
      }
    }

    return void cmd
  }

  /**
   * Parse the `--colors` flag.
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
    fallback: { value: true },
    flags: '-c, --colors [choice]',
    preset: 'true'
  })
  protected parseColors(val: string): boolean {
    return this.util.parseBoolean(val) || !isFalsy(this.util.parseInt(val))
  }

  /**
   * Parse the `--config` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean | string} Parsed option value
   */
  @Option({
    description: 'path to config file or config search setting',
    env: 'GREASE_CONFIG',
    fallback: { value: true },
    flags: '-g, --config [opt]',
    preset: 'true'
  })
  protected parseConfig(val: string): boolean | string {
    return includes(CliUtilityService.BOOLEAN_CHOICES, val)
      ? this.util.parseBoolean(val)
      : val
  }

  /**
   * Parse the `--cwd` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'path to current working directory',
    env: 'GREASE_CWD',
    fallback: { value: DOT },
    flags: '-k, --cwd <dir>'
  })
  protected parseCwd(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--debug` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: CliUtilityService.BOOLEAN_CHOICES,
    description: 'enable verbose output',
    env: 'GREASE_DEBUG',
    fallback: { value: false },
    flags: '-d, --debug [choice]',
    preset: 'true'
  })
  protected parseDebug(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--quiet` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    description: 'disable logs',
    env: 'GREASE_QUIET',
    fallback: { value: false },
    flags: '-q, --quiet',
    preset: 'true'
  })
  protected parseQuiet(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--tagprefix` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'tag prefix to consider when reading tags',
    env: 'GREASE_TAGPREFIX',
    fallback: { value: '' },
    flags: '-T, --tagprefix <prefix>'
  })
  protected parseTagprefix(val: string): string {
    return trim(val)
  }

  /**
   * Preaction lifecycle handler.
   *
   * @see https://github.com/tj/commander.js#life-cycle-hooks
   *
   * @protected
   * @async
   *
   * @param {Program} program - Program instance
   * @param {commander.Command} cmd - Subcommand instance
   * @return {Promise<void>} Nothing when complete
   */
  protected async preAction(
    program: Program,
    cmd: commander.Command
  ): Promise<void> {
    const { config, ...opts } = program.opts()

    // merge options from config file
    if (<boolean>config) {
      /**
       * Configuration options from grease config file.
       *
       * @const {EmptyObject | GreaseConfig} config
       */
      const config: EmptyObject | GreaseConfig = await this.grease.config(opts)

      // merge config
      this.mergeConfig(program, config)
      this.mergeConfig(cmd, config)
    }

    return void this.grease.logger.sync(opts)
  }

  /**
   * Command action handler.
   *
   * @public
   *
   * @return {void} Nothing when complete
   */
  public run(): void {
    return this.command.help({ error: false })
  }

  /**
   * Set the current command.
   *
   * @see {@linkcode command}
   *
   * @public
   * @override
   *
   * @param {Program} program - CLI program instance
   * @return {this} `this` command runner
   */
  public override setCommand(program: Program): this {
    set(program, '_helpConfiguration.showGlobalOptions', true)
    program.hook('preAction', cast(this.preAction.bind(this)))
    program.showHelpAfterError()
    return super.setCommand(program)
  }
}

export default GreaseCommand
