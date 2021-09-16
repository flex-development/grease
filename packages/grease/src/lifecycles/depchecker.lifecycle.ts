import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import logger from '@grease/utils/logger.util'
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
 * @async
 * @param {IGreaseOptions} [options={}] - Application options
 * @return {Promise<void>} Empty promise
 * @throws {Exception}
 */
const Depchecker = async (options: IGreaseOptions = {}): Promise<void> => {
  // Skip lifecycle
  if (options.skip?.depchecker) return

  // Run `predepchecker` script
  await runLifecycleScript(options, 'predepchecker')

  // Dependency commands
  const commands = Object.keys(DependencyCommand)

  // Log checkpoint
  logger(options, 'checking commands:', commands, LogLevel.INFO)

  // Check if required dependencies are installed
  Object.values(DependencyCommand).forEach(command => {
    if (!sh.which(command)) {
      throw new Exception(ExceptionStatusCode.NOT_FOUND, `${command} not found`)
    }

    logger(options, command)
    return
  })

  // Run `postdepchecker` script
  await runLifecycleScript(options, 'postdepchecker')
}

export default Depchecker
