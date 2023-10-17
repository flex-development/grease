/**
 * @file GreaseModule
 * @module grease/GreaseModule
 */

import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import GreaseService from './grease.service'
import { BumpModule } from './subdomains/bump'
import { ChangelogModule } from './subdomains/changelog'
import { ConfigModule } from './subdomains/config'
import { GitModule } from './subdomains/git'
import { LogModule } from './subdomains/log'

/**
 * Global grease module.
 *
 * @class
 */
@Global()
@Module({
  exports: [GreaseService, LogModule],
  imports: [
    BumpModule,
    ChangelogModule,
    ConfigModule,
    CqrsModule.forRoot(),
    GitModule,
    LogModule.forRoot({ tag: GreaseService.NAME })
  ],
  providers: [GreaseService]
})
class GreaseModule {}

export default GreaseModule
