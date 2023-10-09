/**
 * @file GitModule
 * @module grease/git/GitModule
 */

import { LoggerService, ValidationService } from '#src/providers'
import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TagOperationHandler } from './operations'
import { GitService } from './providers'
import { CommitQueryHandler, TagQueryHandler } from './queries'

/**
 * Git operations module.
 *
 * @class
 */
@Global()
@Module({
  exports: [GitService],
  imports: [CqrsModule],
  providers: [
    CommitQueryHandler,
    GitService,
    LoggerService,
    TagOperationHandler,
    TagQueryHandler,
    ValidationService
  ]
})
class GitModule {}

export default GitModule
