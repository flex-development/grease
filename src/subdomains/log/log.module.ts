/**
 * @file LogModule
 * @module grease/log/LogModule
 */

import { Module, type DynamicModule } from '@nestjs/common'
import { LoggerOptions } from './options'
import { LoggerService } from './providers'

/**
 * Logging module.
 *
 * @class
 */
@Module({ exports: [LoggerService], providers: [LoggerService] })
class LogModule {
  /**
   * Create a global logging module.
   *
   * @see {@linkcode LoggerOptions}
   *
   * @public
   * @static
   *
   * @param {Partial<LoggerOptions>?} [options] - Logger options
   * @return {DynamicModule} Global logging module
   */
  public static forRoot(options?: Partial<LoggerOptions>): DynamicModule {
    return {
      exports: [LoggerOptions],
      global: true,
      module: LogModule,
      providers: [
        {
          provide: LoggerOptions,
          useValue: new LoggerOptions(options)
        }
      ]
    }
  }
}

export default LogModule
