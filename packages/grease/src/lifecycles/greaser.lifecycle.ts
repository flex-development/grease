import type { ObjectPlain } from '@flex-development/tutils'
import { GH_RELEASE_CREATE } from '@grease/config/constants.config'
import CreateReleaseDTO from '@grease/dtos/create-release.dto'
import { ExitCode } from '@grease/enums/exit-code.enum'
import type { ICreateReleaseDTO as DTO } from '@grease/interfaces'
import validate from '@grease/utils/validate.util'
import sh from 'shelljs'

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
 * @param {DTO | ObjectPlain} [dto={}] - Data to create release
 * @return {Promise<never>} Function will force shell to exit
 */
const Greaser = async (dto: DTO | ObjectPlain = {}): Promise<never> => {
  // Validate release data
  const release = await validate(CreateReleaseDTO, dto, false)

  // Execute GitHub release
  sh.exec(`${GH_RELEASE_CREATE} ${release.toString()}`)

  // Force shell to exit
  return sh.exit(ExitCode.SUCCESS)
}

export default Greaser
