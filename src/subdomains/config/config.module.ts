/**
 * @file ConfigModule
 * @module grease/config/ConfigModule
 */

import { LogModule } from '#src/log'
import { ValidationService } from '#src/providers'
import { Module } from '@nestjs/common'
import { ConfigService } from './providers'

/**
 * Configuration module.
 *
 * @class
 */
@Module({
  exports: [ConfigService],
  imports: [LogModule],
  providers: [ConfigService, ValidationService]
})
class ConfigModule {}

export default ConfigModule
