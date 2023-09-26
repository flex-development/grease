/**
 * @file GreaseModule
 * @module grease/GreaseModule
 */

import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import GreaseService from './grease.service'
import { LoggerService, ValidationService } from './providers'
import { BumpModule } from './subdomains/bump'
import { GitModule } from './subdomains/git'

/**
 * Global grease module.
 *
 * @class
 */
@Global()
@Module({
  exports: [GreaseService, LoggerService, ValidationService],
  imports: [BumpModule, CqrsModule.forRoot(), GitModule],
  providers: [GreaseService, LoggerService, ValidationService]
})
class GreaseModule {}

export default GreaseModule
