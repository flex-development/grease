/**
 * @file Operations - ChangelogOperationHandler
 * @module grease/changelog/operations/ChangelogOperationHandler
 */

import { ChangelogStream } from '#src/changelog/models'
import { ChangelogQuery } from '#src/changelog/queries'
import { LoggerService } from '#src/providers'
import { CommandHandler, QueryBus, type ICommandHandler } from '@nestjs/cqrs'
import ChangelogOperation from './changelog.operation'

/**
 * Changelog operation handler.
 *
 * @class
 * @implements {ICommandHandler<ChangelogOperation,ChangelogStream>}
 */
@CommandHandler(ChangelogOperation)
class ChangelogOperationHandler
  implements ICommandHandler<ChangelogOperation, ChangelogStream> {
  /**
   * Create a new changelog operation handler.
   *
   * @param {QueryBus} queries - Query bus
   * @param {LoggerService} logger - Logger service
   */
  constructor(
    protected readonly queries: QueryBus,
    protected readonly logger: LoggerService
  ) {}

  /**
   * Execute a changelog operation.
   *
   * @see {@linkcode ChangelogOperation}
   * @see {@linkcode ChangelogStream}
   *
   * @public
   * @async
   *
   * @param {ChangelogOperation} operation - Operation to execute
   * @return {Promise<ChangelogStream>} New changelog stream
   */
  public async execute(
    operation: ChangelogOperation
  ): Promise<ChangelogStream> {
    return new ChangelogStream({
      entries: await this.queries.execute(new ChangelogQuery(operation)),
      logger: this.logger.withTag('changelog'),
      operation
    })
  }
}

export default ChangelogOperationHandler
