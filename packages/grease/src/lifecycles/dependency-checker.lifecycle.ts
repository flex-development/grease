import logger from '@grease/config/logger.config'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import { ExitCode } from '@grease/enums/exit-code.enum'
import sh from 'shelljs'

/**
 * @file Lifecycles - Dependency Checker
 * @module grease/lifecycles/DependencyChecker
 */

/**
 * Checks if the [GitHub CLI][1] is installed and logs the dependency check.
 * Forces the shell to exit with code `0` if both programs are installed, exit
 * code `127` otherwise.
 *
 * [1]: https://cli.github.com/manual
 *
 * @return {never} Shell exits with `ExitCode.NOT_FOUND` | `ExitCode.SUCCESS`
 */
const DependencyChecker = (): never => {
  const checks = Object.keys(DependencyCommand)
  logger.warn(`running dependency check: ${JSON.stringify(checks)}`)

  /**
   * Logs the result of a dependency check.
   *
   * @param {DependencyCommand} command - Dependency being checked
   * @param {sh.ShellString | null} [which] - If null, `log` as error
   * @return {void} Nothing when complete
   */
  const log = (
    command: DependencyCommand,
    which: sh.ShellString | null
  ): void => {
    // Get log level
    const level = which ? 'success' : 'error'

    // Log dependency check
    logger[level](which ? `✓ ${command}` : `${command} not found`)
  }

  // Check if dependencies are installed
  const gh: sh.ShellString = sh.which(DependencyCommand.gh)

  // Log dependency checks
  log(DependencyCommand.gh, gh)

  return sh.exit(!gh ? ExitCode.NOT_FOUND : ExitCode.SUCCESS)
}

export default DependencyChecker
