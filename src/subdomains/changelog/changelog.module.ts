/**
 * @file ChangelogModule
 * @module grease/changelog/ChangelogModule
 */

import { LoggerService, ValidationService } from '#src/providers'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ChangelogEventListener } from './events'
import { ChangelogOperationHandler } from './operations'
import { ChangelogQueryHandler } from './queries'

/**
 * Changelog module.
 *
 * @class
 */
@Module({
  imports: [CqrsModule],
  providers: [
    ChangelogEventListener,
    ChangelogOperationHandler,
    ChangelogQueryHandler,
    LoggerService,
    ValidationService
  ]
})
class ChangelogModule {}

export default ChangelogModule
