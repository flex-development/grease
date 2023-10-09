/**
 * @file BumpModule
 * @module grease/bump/BumpModule
 */

import { LoggerService, ValidationService } from '#src/providers'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BumpEventListener } from './events'
import { BumpOperationHandler } from './operations'
import { BumpQueryHandler } from './queries'

/**
 * Version bump module.
 *
 * @class
 */
@Module({
  imports: [CqrsModule],
  providers: [
    BumpEventListener,
    BumpOperationHandler,
    BumpQueryHandler,
    LoggerService,
    ValidationService
  ]
})
class BumpModule {}

export default BumpModule
