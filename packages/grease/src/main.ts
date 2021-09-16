import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import type { ObjectPlain } from '@flex-development/tutils'
import anymatch from 'anymatch'
import fs from 'fs'
import { currentBranch } from 'isomorphic-git'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import bump from 'standard-version/lib/lifecycles/bump'
import changelog from 'standard-version/lib/lifecycles/changelog'
import commit from 'standard-version/lib/lifecycles/commit'
import tag from 'standard-version/lib/lifecycles/tag'
import runLifecycleScript from 'standard-version/lib/run-lifecycle-script'
import { RELEASE_PATTERN } from './config/constants.config'
import defaults from './config/defaults.config'
import type { IGreaseOptions } from './interfaces'
import depchecker from './lifecycles/depchecker.lifecycle'
import greaser from './lifecycles/greaser.lifecycle'
import notes from './lifecycles/notes.lifecycle'
import type { SemanticVersionTag } from './types'
import cacheOptions from './utils/cache-options.util'
import getPrerelease from './utils/get-prerelease.util'
import logger from './utils/logger.util'
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
  args = merge({}, defaults, args)

  // Run prerelease script
  if (typeof args.scripts.prerelease === 'string') {
    await runLifecycleScript(args, 'prerelease')
  }

  try {
    // Set application options
    const options = await cacheOptions(args)

    // Check if current branch is whitelisted release branch
    if (Array.isArray(options.releaseBranchWhitelist)) {
      const branch = await currentBranch({ dir: options.gitdir, fs })

      if (!anymatch(options.releaseBranchWhitelist, branch || '')) {
        const code = ExceptionStatusCode.CONFLICT
        const data = {
          errors: { branch },
          message: `${branch} not included in release branch whitelist`,
          releaseBranchWhitelist: options.releaseBranchWhitelist
        }

        throw new Exception(code, undefined, data)
      }
    }

    // Check custom changelog header pattern
    if (options.header && options.header.search(RELEASE_PATTERN) !== -1) {
      const code = ExceptionStatusCode.BAD_REQUEST
      const data = {
        errors: { header: options.header },
        message: `custom changelog header must not match ${RELEASE_PATTERN}`
      }

      throw new Exception(code, undefined, data, undefined)
    }

    // Read package files
    const { isPrivate, version } = await readPackageFiles(options)

    // Set prerelease option
    options.prerelease = getPrerelease(options, version)

    // Run bump lifecycle to get new package version
    const newVersion = await bump(
      merge({}, options, { scripts: { prerelease: null } }),
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
      target: options.releaseTarget,
      title: options.releaseTitle,
      version: `${options.tagPrefix}${newVersion}` as SemanticVersionTag
    })

    // Run postrelease script
    await runLifecycleScript(options, 'postrelease')
  } catch (error) {
    const {
      code = ExceptionStatusCode.INTERNAL_SERVER_ERROR,
      data = {},
      errors = [],
      message,
      stack
    } = error as Exception

    logger(args, message, [], LogLevel.ERROR, true)

    throw new Exception(code, message, { ...data, errors }, stack).toJSON()
  }

  return
}

export default main
