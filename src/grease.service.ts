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
import {
  ConfigService,
  type GreaseConfig,
  type IGreaseConfig
} from '#src/config'
import type { PackageManifest } from '#src/models'
import { LoggerService, ValidationService } from '#src/providers'
import { cast, isString, type EmptyObject } from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { GlobalOptions } from './options'

/**
 * Grease runner service.
 *
 * @class
 */
@Injectable()
class GreaseService {
  /**
   * Application name.
   *
   * @public
   * @static
   * @readonly
   * @member {string} NAME
   */
  public static readonly NAME: string = ConfigService.NAME

  /**
   * Create a new grease runner service.
   *
   * @param {ConfigService} gc - Configuration service
   * @param {EventBus} events - Events bus
   * @param {CommandBus} operations - Operations bus
   * @param {QueryBus} queries - Query bus
   * @param {LoggerService} logger - Logger service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly gc: ConfigService,
    protected readonly events: EventBus,
    protected readonly operations: CommandBus,
    protected readonly queries: QueryBus,
    public readonly logger: LoggerService,
    public readonly validator: ValidationService
  ) {}

  /**
   * Bump a package version.
   *
   * @see {@linkcode BumpEvent}
   * @see {@linkcode BumpOperationDTO}
   * @see {@linkcode PackageManifest}
   *
   * @public
   * @async
   * @fires BumpEvent
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

    this.events.publish(new BumpEvent(manifest, cast(operation)))
    return manifest
  }

  /**
   * Load configuration options from a grease config file.
   *
   * @see {@linkcode GreaseConfig}
   * @see {@linkcode IGreaseConfig}
   *
   * @public
   * @async
   *
   * @template T - Parsed commit type
   *
   * @param {IGreaseConfig?} [opts] - Configuration overrides
   * @return {Promise<EmptyObject | GreaseConfig>} Configuration options
   */
  public async config(
    opts?: IGreaseConfig
  ): Promise<EmptyObject | GreaseConfig> {
    const { config } = await this.validator.validate(new GlobalOptions(opts))
    return isString(config) ? this.gc.load(config, opts) : this.gc.search(opts)
  }

  /**
   * Get a version bump recommendation.
   *
   * @see {@linkcode BumpEvent}
   * @see {@linkcode BumpQuery}
   * @see {@linkcode RecommendedBump}
   *
   * @public
   * @async
   * @fires BumpEvent
   *
   * @param {Partial<BumpQuery>?} [query] - Bump recommendation query
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
