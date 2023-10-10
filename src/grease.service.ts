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
  ChangelogEvent,
  ChangelogOperation,
  type ChangelogOperationDTO,
  type ChangelogStream
} from '#src/changelog'
import {
  ConfigService,
  type GreaseConfig,
  type IGreaseConfig
} from '#src/config'
import {
  TagOperation,
  TagQuery,
  type Commit,
  type TagOperationDTO
} from '#src/git'
import type { PackageManifest } from '#src/models'
import { LoggerService } from '#src/providers'
import { isString, type EmptyObject } from '@flex-development/tutils'
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
   */
  constructor(
    protected readonly gc: ConfigService,
    protected readonly events: EventBus,
    protected readonly operations: CommandBus,
    protected readonly queries: QueryBus,
    public readonly logger: LoggerService
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
   * @param {BumpOperationDTO} payload - Bump operation payload
   * @return {Promise<PackageManifest>} Package manifest
   */
  public async bump(payload: BumpOperationDTO): Promise<PackageManifest> {
    /**
     * Bump operation to execute.
     *
     * @const {BumpOperation} operation
     */
    const operation: BumpOperation = new BumpOperation(payload)

    /**
     * Updated package manifest.
     *
     * @const {PackageManifest} manifest
     */
    const manifest: PackageManifest = await this.operations.execute(operation)

    this.events.publish(new BumpEvent(manifest, operation))
    return manifest
  }

  /**
   * Generate a changelog from git metadata.
   *
   * @see {@linkcode ChangelogEvent}
   * @see {@linkcode ChangelogOperationDTO}
   * @see {@linkcode ChangelogStream}
   *
   * @public
   * @async
   * @fires ChangelogEvent
   *
   * @template T - Parsed commit type
   *
   * @param {ChangelogOperationDTO<T>?} [payload] - Changelog operation payload
   * @return {Promise<ChangelogStream<T>>} Changlog stream
   */
  public async changelog<T extends Commit = Commit>(
    payload?: ChangelogOperationDTO<T>
  ): Promise<ChangelogStream<T>> {
    /**
     * Changelog operation to execute.
     *
     * @const {ChangelogOperation<T>} operation
     */
    const operation: ChangelogOperation<T> = new ChangelogOperation(payload)

    /**
     * Changelog stream.
     *
     * @const {ChangelogStream<T>}
     */
    const stream: ChangelogStream<T> = await this.operations.execute(operation)

    this.events.publish(new ChangelogEvent<T>(stream, operation))
    return stream
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
   * @param {IGreaseConfig<T>?} [opts] - Configuration overrides
   * @return {Promise<EmptyObject | GreaseConfig<T>>} Configuration options
   */
  public async config<T extends Commit = Commit>(
    opts?: IGreaseConfig<T>
  ): Promise<EmptyObject | GreaseConfig<T>> {
    const { config } = new GlobalOptions(opts)
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
   * @param {Partial<BumpQuery>?} [params] - Version bump query parameters
   * @return {Promise<RecommendedBump>} Recommended version bump
   */
  public async recommend(
    params?: Partial<BumpQuery>
  ): Promise<RecommendedBump> {
    /**
     * Version bump query to execute.
     *
     * @const {BumpQuery} query
     */
    const query: BumpQuery = new BumpQuery(params)

    /**
     * Version bump recommendation.
     *
     * @const {RecommendedBump} recommendation
     */
    const recommendation: RecommendedBump = await this.queries.execute(query)

    this.events.publish(new BumpEvent(recommendation, query))
    return recommendation
  }

  /**
   * Create a new release tag, or overwrite an existing one.
   *
   * @see {@linkcode TagOperationDTO}
   * @see {@linkcode TagOperation}
   *
   * @public
   * @async
   *
   * @param {TagOperationDTO} payload - Tag operation payload
   * @return {Promise<TagOperation>} Executed tag operation
   */
  public async tag(payload: TagOperationDTO): Promise<TagOperation> {
    return this.operations.execute(new TagOperation(payload))
  }

  /**
   * Get git tags.
   *
   * @see {@linkcode TagQuery}
   *
   * @public
   * @async
   *
   * @param {Partial<TagQuery>?} [params] - Tag query parameters
   * @return {Promise<string[]>} Git tags array
   */
  public async tags(params?: Partial<TagQuery>): Promise<string[]> {
    return this.queries.execute(new TagQuery(params))
  }
}

export default GreaseService
