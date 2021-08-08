import type { ObjectPlain } from '@flex-development/tutils'
import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import logger from '@grease/config/logger.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import type { ICreateReleaseDTO as DTO } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import validate from '@grease/utils/validate.util'
import ch from 'chalk'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'

/**
 * @file Lifecycles - Greaser
 * @module grease/lifecycles/Greaser
 */

/**
 * Creates a GitHub release using the [GitHub CLI][1].
 *
 * [1]: https://cli.github.com/manual/gh_release_create
 *
 * @async
 * @param {GreaseOptions} [options={}] - Application options
 * @param {DTO | ObjectPlain} [dto={}] - Data to create release
 * @return {Promise<void>} Empty promise when complete
 */
const Greaser = async (
  options: GreaseOptions = {},
  dto: DTO | ObjectPlain = {}
): Promise<void> => {
  // Skip lifecycle
  if (options.skip?.depchecker || options.skip?.greaser) return

  // Run `pregreaser` script
  runLifecycleScript(options, 'pregreaser')

  // Log validation checkpoint
  logger.checkpoint('validating release data...', [], ch.yellow('!!'))

  // Validate release data
  const release = await validate(CreateReleaseDTO, dto, false)

  // Log release start checkpoint
  logger.checkpoint('starting github release...', [], ch.yellow('!!'))

  // Get release command
  const command = `${GH_RELEASE_CREATE} ${release.toString()}`

  // Execute GitHub release
  if (!options.dryRun) sh.exec(command, { silent: options.silent })
  else logger.checkpoint(command, [], ch.yellow('!!'))

  // Run `postgreaser` script
  runLifecycleScript(options, 'postgreaser')
}

export default Greaser
