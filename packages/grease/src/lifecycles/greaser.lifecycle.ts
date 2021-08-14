import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import type { ICreateReleaseDTO, IGreaseOptions } from '@grease/interfaces'
import log from '@grease/utils/log.util'
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
  runLifecycleScript(options, 'pregreaser')

  // Log release start checkpoint
  log(options, 'starting github release...', [], 'info')

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
    log(options, GH_RELEASE_CREATE)

    if (!options.silent) console.log(`\n---\n${ch.gray(command)}\n---\n`)
  }

  // Run `postgreaser` script
  runLifecycleScript(options, 'postgreaser')
}

export default Greaser
