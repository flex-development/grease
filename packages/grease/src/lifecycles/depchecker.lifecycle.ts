import logger from '@grease/config/logger.config'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import { ExitCode } from '@grease/enums/exit-code.enum'
import ch from 'chalk'
import figures from 'figures'
import sh from 'shelljs'

/**
 * @file Lifecycles - Depchecker
 * @module grease/lifecycles/Depchecker
 */

/**
 * Checks if required dependencies are installed. Forces the shell to exit with
 * code `0` if all dependencies are installed, and `127` otherwise.
 *
 * Required Dependencies:
 *
 * - GitHub CLI - [`gh`][1]
 *
 * [1]: https://cli.github.com/manual
 *
 * @return {never} Shell exits with `ExitCode.NOT_FOUND` | `ExitCode.SUCCESS`
 */
const Depchecker = (): never => {
  logger.checkpoint(
    'checking dependency commands',
    Object.keys(DependencyCommand),
    ch.yellow('!!')
  )

  // Check if dependencies are installed
  Object.values(DependencyCommand).forEach(command => {
    if (!sh.which(command)) {
      logger.checkpoint(`${command} not found`, [], ch.red(figures.cross))
      return sh.exit(ExitCode.NOT_FOUND)
    }

    return
  })

  return sh.exit(ExitCode.SUCCESS)
}

export default Depchecker

Depchecker()
