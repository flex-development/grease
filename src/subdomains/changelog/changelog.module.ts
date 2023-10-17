/**
 * @file ChangelogModule
 * @module grease/changelog/ChangelogModule
 */

import { GitModule } from '#src/git'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
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
  imports: [CqrsModule, GitModule, LogModule],
  providers: [
    ChangelogEventListener,
    ChangelogOperationHandler,
    ChangelogQueryHandler,
    ValidationService
  ]
})
class ChangelogModule {}

export default ChangelogModule
