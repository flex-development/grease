/**
 * @file BumpModule
 * @module grease/bump/BumpModule
 */

import { GitModule } from '#src/git'
import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BumpOperationHandler } from './operations'
import { BumpQueryHandler } from './queries'

/**
 * Version bump module.
 *
 * @class
 */
@Module({
  imports: [CqrsModule, GitModule, LogModule],
  providers: [BumpOperationHandler, BumpQueryHandler, ValidationService]
})
class BumpModule {}

export default BumpModule
