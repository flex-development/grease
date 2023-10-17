/**
 * @file GitModule
 * @module grease/git/GitModule
 */

import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
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
  imports: [CqrsModule, LogModule],
  providers: [
    CommitQueryHandler,
    GitService,
    TagOperationHandler,
    TagQueryHandler,
    ValidationService
  ]
})
class GitModule {}

export default GitModule
