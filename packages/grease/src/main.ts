import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import type { ObjectPlain } from '@flex-development/tutils'
import ch from 'chalk'
import fig from 'figures'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import bump from 'standard-version/lib/lifecycles/bump'
import changelog from 'standard-version/lib/lifecycles/changelog'
import commit from 'standard-version/lib/lifecycles/commit'
import tag from 'standard-version/lib/lifecycles/tag'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import cache from './config/cache.config'
import { RELEASE_PATTERN } from './config/constants.config'
import defaults from './config/defaults.config'
import logger from './config/logger.config'
import type { IGreaseOptions } from './interfaces'
import depchecker from './lifecycles/depchecker.lifecycle'
import greaser from './lifecycles/greaser.lifecycle'
import notes from './lifecycles/notes.lifecycle'
import readPackageFiles from './utils/read-package-files.util'

/**
 * @file Main Method
 * @module grease/main
 */

/**
 * Integrates `grease` lifecycles and the [`standard-version`][1] library.
 *
 * [1]: https://github.com/conventional-changelog/standard-version
 *
 * @async
 * @param {IGreaseOptions | ObjectPlain} [args={}] - Application options
 * @return {Promise<void>} Empty promise when complete
 */
const main = async (args: IGreaseOptions | ObjectPlain = {}): Promise<void> => {
  try {
    // Set application options
    const options = await cache.setOptions(merge(defaults, args))

    // Check custom changelog header pattern
    if (options.header && options.header.search(RELEASE_PATTERN) !== -1) {
      const code = ExceptionStatusCode.BAD_REQUEST
      const data = {
        errors: { header: options.header },
        message: `custom changelog header must not match ${RELEASE_PATTERN}`,
        options: options
      }

      throw new Exception(code, undefined, data, undefined)
    }

    // Run prerelease script
    runLifecycleScript(options, 'prerelease')

    // Read package files
    const { isPrivate, version } = await readPackageFiles(options)

    // Run bump lifecycle to get new package version
    const newVersion = await bump(
      merge({}, options, { scripts: { prerelease: undefined } }),
      version
    )

    // Run changelog lifecycle
    await changelog(options, newVersion)

    // Run commit lifecycle
    await commit(options, newVersion)

    // Run tag lifecycle
    await tag(newVersion, isPrivate, options)

    // Run depchecker lifecycle
    depchecker(options)

    // Run notes and greaser lifecycles
    await greaser(options, {
      draft: options.releaseDraft,
      files: options.releaseAssets,
      notes: await notes(options, newVersion),
      notesFile: options.notesFile,
      prerelease: !isEmpty(options.prerelease),
      repo: options.repo,
      tagPrefix: options.tagPrefix,
      target: options.releaseTarget,
      title: options.releaseTitle,
      version: newVersion
    })
  } catch (error) {
    const {
      code = ExceptionStatusCode.INTERNAL_SERVER_ERROR,
      data = {},
      errors = [],
      message,
      stack
    } = error as Exception

    logger.checkpoint(ch.bold.white(message), [], ch.bold.red(fig.cross))

    throw new Exception(code, message, { ...data, errors }, stack).toJSON()
  }

  return
}

export default main
