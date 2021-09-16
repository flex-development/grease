import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import type { ICreateReleaseDTO, IGreaseOptions } from '@grease/interfaces'
import logger from '@grease/utils/logger.util'
import validate from '@grease/utils/validate.util'
import ch from 'chalk'
import { classToPlain } from 'class-transformer'
import sh from 'shelljs'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import util from 'util'

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
 * @param {IGreaseOptions} [options={}] - Application options
 * @param {ICreateReleaseDTO} dto - Data to create GitHub release
 * @return {Promise<void>} Empty promise when complete
 */
const Greaser = async (
  options: IGreaseOptions = {},
  dto: ICreateReleaseDTO
): Promise<void> => {
  // Skip lifecycle
  if (options.skip?.depchecker || options.skip?.greaser) return

  // Run `pregreaser` script
  await runLifecycleScript(options, 'pregreaser')

  // Log release start checkpoint
  logger(options, 'starting github release...', [], LogLevel.INFO)

  // Validate release data
  dto = await validate(CreateReleaseDTO, dto, false)

  if (options.dryRun && !options.silent) {
    const message = util.inspect(classToPlain(dto), false, null)
    console.log(`\n${ch.gray(message)}\n`)
  }

  // Get release command
  const command = `${GH_RELEASE_CREATE} ${dto.toString()}`

  // Execute GitHub release
  if (!options.dryRun) sh.exec(command, { silent: options.silent })
  else {
    logger(options, GH_RELEASE_CREATE)

    if (!options.silent) {
      logger(options, `\n---\n${ch.gray(command)}\n---\n`, [], LogLevel.DEBUG)
    }
  }

  // Run `postgreaser` script
  await runLifecycleScript(options, 'postgreaser')
}

export default Greaser
