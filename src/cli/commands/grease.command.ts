/**
 * @file Commands - GreaseCommand
 * @module grease/commands/GreaseCommand
 */

import pkg from '#pkg' assert { type: 'json' }
import {
  CliUtilityService,
  Command,
  CommandRunner,
  Option,
  Program
} from '@flex-development/nest-commander'
import {
  DOT,
  isFalsy,
  lowercase,
  set,
  trim
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
  name: pkg.name.replace(/.*\//, ''),
  root: true,
  subcommands: [BumpCommand, InfoCommand]
})
class GreaseCommand extends CommandRunner {
  /**
   * Create a new `grease` command runner.
   *
   * @param {CliUtilityService} util - Utilities service
   */
  constructor(protected readonly util: CliUtilityService) {
    super()
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
   * Parse the `--cwd` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {string} Parsed option value
   */
  @Option({
    description: 'path to current working directory',
    env: 'PWD',
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
    conflicts: ['silent'],
    description: 'enable verbose output',
    fallback: { value: false },
    flags: '-d, --debug',
    preset: 'true'
  })
  protected parseDebug(val: string): boolean {
    return this.util.parseBoolean(val)
  }

  /**
   * Parse the `--silent` flag.
   *
   * @protected
   *
   * @param {string} val - Value to parse
   * @return {boolean} Parsed option value
   */
  @Option({
    conflicts: ['debug'],
    description: 'disable logs',
    fallback: { value: false },
    flags: '-s, --silent',
    preset: 'true'
  })
  protected parseSilent(val: string): boolean {
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
    fallback: { value: '' },
    flags: '-T, --tagprefix <prefix>'
  })
  protected parseTagprefix(val: string): string {
    return trim(val)
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
    program.showHelpAfterError()
    return super.setCommand(program)
  }
}

export default GreaseCommand
