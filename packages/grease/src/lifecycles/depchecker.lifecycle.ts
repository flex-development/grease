import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import logger from '@grease/config/logger.config'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import GreaseOptions from '@grease/models/grease-options.model'
import ch from 'chalk'
import figures from 'figures'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'

/**
 * @file Lifecycles - depchecker
 * @module grease/lifecycles/depchecker
 */

/**
 * Checks if required dependencies are installed. An exception will be thrown if
 * any dependencies are not found.
 *
 * Required Dependencies:
 *
 * - GitHub CLI - [`gh`][1]
 *
 * [1]: https://cli.github.com/manual
 *
 * @param {GreaseOptions} [options={}] - Application options
 * @return {void} Nothing when complete
 * @throws {Exception}
 */
const Depchecker = (options: GreaseOptions = {}): void => {
  // Skip lifecycle
  if (options.skip?.depchecker) return

  // Run `predepchecker` script
  runLifecycleScript(options, 'predepchecker')

  // Dependency commands
  const commands = Object.keys(DependencyCommand)

  // Log checkpoint
  logger.checkpoint('checking dependency commands', commands, ch.yellow('!!'))

  // Check if required dependencies are installed
  Object.values(DependencyCommand).forEach(command => {
    if (!sh.which(command)) {
      throw new Exception(ExceptionStatusCode.NOT_FOUND, `${command} not found`)
    }

    logger.checkpoint(command, [], ch.green(figures.tick))
    return
  })

  // Run `postdepchecker` script
  runLifecycleScript(options, 'postdepchecker')
}

export default Depchecker
