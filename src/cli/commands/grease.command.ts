/**
 * @file Commands - GreaseCommand
 * @module grease/commands/GreaseCommand
 */

import pkg from '#pkg' assert { type: 'json' }
import type { GreaseConfig } from '#src/config'
import GreaseService from '#src/grease.service'
import type { GlobalOptions } from '#src/options'
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
  hasOwn,
  includes,
  isFalsy,
  keys,
  lowercase,
  omit,
  set,
  trim,
  type EmptyObject
} from '@flex-development/tutils'
import BumpCommand from './bump.command'
import ChangelogCommand from './changelog.command'
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
  subcommands: [BumpCommand, ChangelogCommand, InfoCommand]
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
   * @param {commander.OptionValues} config - Configuration object to merge
   * @return {void} Nothing when complete
   */
  protected mergeConfig(
    cmd: commander.Command,
    config: commander.OptionValues
  ): void {
    /**
     * Configuration data for {@linkcode cmd}.
     *
     * @const {commander.OptionValues} data
     */
    const data: commander.OptionValues = get(config, cmd.name(), config)

    /**
     * Merged local and global option values.
     *
     * @const {commander.OptionValues} opts
     */
    const opts: commander.OptionValues = cmd.optsWithGlobals()

    // override cli defaults + pass config-only options
    for (const key of keys(data)) {
      if (hasOwn(opts, key)) {
        switch (fallback(cmd.getOptionValueSource(key), 'default')) {
          case 'default':
            cmd.setOptionValueWithSource(key, get(data, key), 'config')
            break
          default:
            continue
        }
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
    description: 'tag prefix to consider when creating and listing tags',
    env: 'GREASE_TAGPREFIX',
    fallback: { value: '' },
    flags: '-T, --tagprefix <prefix>'
  })
  protected parseTagprefix(val: string): string {
    return trim(val)
  }

  /**
   * Parse the `--unstable` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    choices: CliUtilityService.BOOLEAN_CHOICES,
    description: 'include unstable releases',
    fallback: { value: true },
    flags: '-u, --unstable [choice]',
    preset: 'true'
  })
  protected parseUnstable(val: string): boolean {
    return this.util.parseBoolean(val)
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
    /**
     * Parsed program options.
     *
     * @const {GlobalOptions} opts
     */
    const opts: GlobalOptions = program.opts()

    /**
     * Configuration options from grease config file.
     *
     * @const {EmptyObject | GreaseConfig} config
     */
    const config: EmptyObject | GreaseConfig = await this.grease.config({
      ...omit(opts, ['tagprefix'])
    })

    this.mergeConfig(program, config)
    return void this.mergeConfig(cmd, config)
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
