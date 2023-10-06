/**
 * @file ConfigModule
 * @module grease/config/ConfigModule
 */

import { LoggerService, ValidationService } from '#src/providers'
import { Module } from '@nestjs/common'
import { ConfigService } from './providers'

/**
 * Configuration module.
 *
 * @class
 */
@Module({
  exports: [ConfigService],
  providers: [ConfigService, LoggerService, ValidationService]
})
class ConfigModule {}

export default ConfigModule
