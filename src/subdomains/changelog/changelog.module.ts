/**
 * @file ChangelogModule
 * @module grease/changelog/ChangelogModule
 */

import { LoggerService } from '#src/providers'
import { Module } from '@nestjs/common'
import { ChangelogEventListener } from './events'
import { ChangelogOperationHandler } from './operations'
import { ChangelogQueryHandler } from './queries'

/**
 * Changelog module.
 *
 * @class
 */
@Module({
  providers: [
    ChangelogEventListener,
    ChangelogOperationHandler,
    ChangelogQueryHandler,
    LoggerService
  ]
})
class ChangelogModule {}

export default ChangelogModule
