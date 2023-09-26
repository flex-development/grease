/**
 * @file GreaseService
 * @module grease/GreaseService
 */

import {
  BumpEvent,
  BumpOperation,
  BumpQuery,
  RecommendedBump,
  type BumpOperationDTO
} from '#src/bump'
import type { PackageManifest } from '#src/models'
import { ValidationService } from '#src/providers'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'

/**
 * Grease runner operations service.
 *
 * @class
 */
@Injectable()
class GreaseService {
  /**
   * Create a new grease runner service.
   *
   * @param {EventBus} events - Events bus
   * @param {CommandBus} operations - Operations bus
   * @param {QueryBus} queries - Query bus
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly events: EventBus,
    protected readonly operations: CommandBus,
    protected readonly queries: QueryBus,
    public readonly validator: ValidationService
  ) {}

  /**
   * Bump a package version.
   *
   * @see {@linkcode BumpOperationDTO}
   * @see {@linkcode PackageManifest}
   *
   * @public
   * @async
   *
   * @param {BumpOperationDTO} operation - Version bump operation
   * @return {Promise<PackageManifest>} Package manifest
   */
  public async bump(operation: BumpOperationDTO): Promise<PackageManifest> {
    operation = await this.validator.validate(new BumpOperation(operation))

    /**
     * Updated package manifest.
     *
     * @const {PackageManifest} manifest
     */
    const manifest: PackageManifest = await this.operations.execute(operation)

    this.events.publish(new BumpEvent(manifest, <BumpOperation>operation))
    return manifest
  }

  /**
   * Get a version bump recommendation.
   *
   * @see {@linkcode BumpQuery}
   * @see {@linkcode RecommendedBump}
   *
   * @public
   * @async
   *
   * @param {Partial<BumpQuery>} [query] - Bump recommendation query
   * @return {Promise<RecommendedBump>} Recommended version bump
   */
  public async recommend(query?: Partial<BumpQuery>): Promise<RecommendedBump> {
    query = await this.validator.validate(new BumpQuery(query))

    /**
     * Version bump recommendation.
     *
     * @const {RecommendedBump} recommendation
     */
    const recommendation: RecommendedBump = await this.queries.execute(query)

    this.events.publish(new BumpEvent(recommendation, <BumpQuery>query))
    return recommendation
  }
}

export default GreaseService
