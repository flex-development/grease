/**
 * @file GitModule
 * @module grease/git/GitModule
 */

import { LoggerService, ValidationService } from '#src/providers'
import { Global, Module } from '@nestjs/common'
import { GitService } from './providers'

/**
 * Global git operations module.
 *
 * @class
 */
@Global()
@Module({
  exports: [GitService],
  providers: [GitService, LoggerService, ValidationService]
})
class GitModule {}

export default GitModule
