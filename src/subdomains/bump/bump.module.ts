/**
 * @file BumpModule
 * @module grease/bump/BumpModule
 */

import { LoggerService } from '#src/providers'
import { Module } from '@nestjs/common'
import { BumpEventListener } from './events'
import { BumpOperationHandler } from './operations'
import { BumpQueryHandler } from './queries'

/**
 * Bump operations module.
 *
 * @class
 */
@Module({
  providers: [
    BumpEventListener,
    BumpOperationHandler,
    BumpQueryHandler,
    LoggerService
  ]
})
class BumpModule {}

export default BumpModule
