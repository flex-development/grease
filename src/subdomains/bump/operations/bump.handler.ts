/**
 * @file Operations - BumpOperationHandler
 * @module grease/bump/operations/BumpOperationHandler
 */

import { Manifest, PackageManifest } from '#src/models'
import { ValidationService } from '#src/providers'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import BumpOperation from './bump.operation'

/**
 * Version bump operation handler.
 *
 * @class
 * @implements {ICommandHandler<BumpOperation,PackageManifest>}
 */
@CommandHandler(BumpOperation)
class BumpOperationHandler
  implements ICommandHandler<BumpOperation, PackageManifest> {
  /**
   * Create a new version bump operation handler.
   *
   * @param {ValidationService} validator - Validation service
   */
  constructor(protected readonly validator: ValidationService) {}

  /**
   * Execute a version bump operation.
   *
   * @see {@linkcode BumpOperation}
   * @see {@linkcode PackageManifest}
   *
   * @public
   * @async
   *
   * @param {BumpOperation} operation - Operation to execute
   * @return {Promise<PackageManifest>} Updated package manifest
   */
  public async execute(operation: BumpOperation): Promise<PackageManifest> {
    const {
      cwd,
      preid,
      prestart,
      release,
      write
    } = await this.validator.validate(operation)

    /**
     * Manifest file.
     *
     * @const {PackageManifest} manifest
     */
    const manifest: PackageManifest = new PackageManifest(cwd)

    // exit early if bump is not needed
    if (manifest.version.version === release) return manifest

    // bump manifest version
    manifest.version = manifest.version.inc(release, preid, prestart)

    // write version bump to manifest
    write && await (<Manifest>manifest).write()

    return manifest
  }
}

export default BumpOperationHandler
