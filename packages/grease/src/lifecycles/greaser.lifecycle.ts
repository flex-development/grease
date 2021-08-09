import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import logger from '@grease/config/logger.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import type { ICreateReleaseDTO } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import ch from 'chalk'
import { classToPlain } from 'class-transformer'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'

/**
 * @file Lifecycles - greaser
 * @module grease/lifecycles/greaser
 */

/**
 * Creates a GitHub release using the [GitHub CLI][1].
 *
 * [1]: https://cli.github.com/manual/gh_release_create
 *
 * @async
 * @param {GreaseOptions} [options={}] - Application options
 * @param {ICreateReleaseDTO} dto - Data to create GitHub release
 * @return {Promise<void>} Empty promise when complete
 */
const Greaser = async (
  options: GreaseOptions = {},
  dto: ICreateReleaseDTO
): Promise<void> => {
  // Skip lifecycle
  if (options.skip?.depchecker || options.skip?.greaser) return

  // Run `pregreaser` script
  runLifecycleScript(options, 'pregreaser')

  // Log release start checkpoint
  logger.checkpoint('starting github release...', [], ch.yellow('!!'))

  // Get release command
  const command = `${GH_RELEASE_CREATE} ${new CreateReleaseDTO(dto).toString()}`

  // Execute GitHub release
  if (!options.dryRun) sh.exec(command, { silent: options.silent })
  else logger.checkpoint(command, [classToPlain(dto)], ch.yellow('!!'))

  // Run `postgreaser` script
  runLifecycleScript(options, 'postgreaser')
}

export default Greaser
