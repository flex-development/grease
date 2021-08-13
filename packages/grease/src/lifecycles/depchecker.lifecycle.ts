import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { DependencyCommand } from '@grease/enums/dependency-command.enum'
import type { IGreaseOptions } from '@grease/interfaces'
import log from '@grease/utils/log.util'
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
 * @param {IGreaseOptions} [options={}] - Application options
 * @return {void} Nothing when complete
 * @throws {Exception}
 */
const Depchecker = (options: IGreaseOptions = {}): void => {
  // Skip lifecycle
  if (options.skip?.depchecker) return

  // Run `predepchecker` script
  runLifecycleScript(options, 'predepchecker')

  // Dependency commands
  const commands = Object.keys(DependencyCommand)

  // Log checkpoint
  log(options, 'checking dependency commands', commands, 'info')

  // Check if required dependencies are installed
  Object.values(DependencyCommand).forEach(command => {
    if (!sh.which(command)) {
      throw new Exception(ExceptionStatusCode.NOT_FOUND, `${command} not found`)
    }

    log(options, command)
    return
  })

  // Run `postdepchecker` script
  runLifecycleScript(options, 'postdepchecker')
}

export default Depchecker
