/**
 * @file Operations - BumpOperationHandler
 * @module grease/bump/operations/BumpOperationHandler
 */

import { LoggerService } from '#src/log'
import type { Manifest, Version } from '#src/models'
import { ValidationService } from '#src/providers'
import { at, select } from '@flex-development/tutils'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import BumpOperation from './bump.operation'

/**
 * Version bump operation handler.
 *
 * @see {@linkcode BumpOperation}
 * @see {@linkcode Version}
 *
 * @class
 * @implements {ICommandHandler<BumpOperation,Version>}
 */
@CommandHandler(BumpOperation)
class BumpOperationHandler implements ICommandHandler<BumpOperation, Version> {
  /**
   * Create a new version bump operation handler.
   *
   * @see {@linkcode LoggerService}
   * @see {@linkcode ValidationService}
   *
   * @param {LoggerService} logger - Logger instance
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly logger: LoggerService,
    protected readonly validator: ValidationService
  ) {
    this.logger = logger.withTag('bump')
  }

  /**
   * Execute a version bump operation.
   *
   * @see {@linkcode BumpOperation}
   * @see {@linkcode Version}
   *
   * @public
   * @async
   *
   * @param {BumpOperation} operation - Operation to execute
   * @return {Promise<Version>} Bumped version
   */
  public async execute(operation: BumpOperation): Promise<Version> {
    const {
      color,
      cwd,
      files,
      level,
      preid,
      prestart,
      release,
      write
    } = await this.validator.validate(operation)

    // sync logger
    this.logger.sync({ color, level }).verbose(operation)

    // log bump start
    this.logger.start(release)

    /**
     * Bump files.
     *
     * @const {[Manifest, ...Manifest[]]}
     */
    const manifests: [Manifest, ...Manifest[]] = [
      new (at(files, 0))(cwd),
      ...select(files.slice(1), null, Manifest => new Manifest(cwd))
    ]

    // execute version bumps
    for (const manifest of manifests) {
      if (manifest.version.version !== release) {
        /**
         * Current manifest version.
         *
         * @const {Version} version
         */
        const version: Version = manifest.version

        // bump manifest version
        manifest.version = manifest.version.inc(release, preid, prestart)

        // log bump
        this.logger.info(
          '%s → %s (%s)',
          version.version,
          manifest.version.version,
          this.logger.colors.dim(manifest.file)
        )

        // write version bump to manifest
        if (write) {
          await manifest.write()
          this.logger.debug('bump written')
        }
      }
    }

    return at(manifests, 0).version
  }
}

export default BumpOperationHandler
