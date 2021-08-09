import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import GreaseOptions from '@grease/models/grease-options.model'
import type {
  PackageFileResult,
  SemanticVersion,
  UpdaterJSON
} from '@grease/types'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import latestSemverTag from 'standard-version/lib/latest-semver-tag'
import resolveUpdater from 'standard-version/lib/updaters'

/**
 * @file Utility - readPackageFiles
 * @module grease/utils/readPackageFiles
 */

/**
 * Resolves [updaters][1] from `options.packageFiles` and retrieves the current
 * package version.
 *
 * [1]: https://github.com/conventional-changelog/standard-version#bumpfiles-packagefiles-and-updaters
 *
 * @async
 * @param {GreaseOptions} [options={}] - Application options
 * @return {Promise<PackageFileResult>} Promise containing current pakcage
 * version and boolean indicating if package is private or not
 * @throws {Exception}
 */
const readPackageFiles = async (
  options: GreaseOptions = {}
): Promise<PackageFileResult> => {
  // Spread options
  const { gitTagFallback, packageFiles = [], tagPrefix } = options

  // Init result container object
  let pkg: { private: boolean; version?: SemanticVersion } | null = null

  // Read each package file
  for (const file of packageFiles) {
    const updater = resolveUpdater(file)

    // Do nothing if updater wasn't resolved
    if (!updater || !updater.updater) continue

    // Get package file path
    const filepath = path.resolve(process.cwd(), updater.filename)

    // Do nothing if file path does not exist
    if (!existsSync(filepath)) continue

    // Get file content
    const contents = readFileSync(filepath, 'utf8')

    // Get updater functions
    const { isPrivate, readVersion } = updater.updater as UpdaterJSON

    // Reset result container object
    pkg = {
      private: isPrivate ? isPrivate(contents) : false,
      version: readVersion(contents)
    }

    break
  }

  // Init current package version
  let version: SemanticVersion | null = null

  // Check pkg object for package version not found
  if (pkg && pkg.version) version = pkg.version

  // If package version should fallback to latest git semver tag, fetch it
  if (gitTagFallback) version = await latestSemverTag(tagPrefix)

  // Throw exception if package version not found
  if (!version) {
    const data = { gitTagFallback, packageFiles, pkg, tagPrefix }
    const message = 'package version not found'

    throw new Exception(ExceptionStatusCode.NOT_FOUND, message, data)
  }

  return { isPrivate: pkg?.private ?? false, version }
}

export default readPackageFiles
