/**
 * @file ProgramModule
 * @module grease/cli/ProgramModule
 */

import GreaseModule from '#src/grease.module'
import { LoggerService } from '#src/providers'
import type { CommanderError } from '@flex-development/nest-commander/commander'
import { Module } from '@nestjs/common'
import { BumpCommand, GreaseCommand, InfoCommand } from './commands'

/**
 * CLI application module.
 *
 * @class
 */
@Module({
  imports: [GreaseModule],
  providers: [BumpCommand, GreaseCommand, InfoCommand]
})
class ProgramModule {
  /**
   * Logger instance.
   *
   * @public
   * @static
   * @readonly
   * @member {LoggerService} logger
   */
  public static readonly logger: LoggerService = new LoggerService()

  /**
   * CLI command error handler.
   *
   * @public
   * @static
   *
   * @param {Error} e - Error to handle
   * @return {void} Nothing when complete
   */
  public static error(e: Error): void {
    this.logger.error(e)
    return void (process.exitCode = 1)
  }

  /**
   * Commander error handler.
   *
   * @public
   * @static
   *
   * @param {CommanderError} e - Error to handle
   * @return {void} Nothing when complete
   */
  public static exit(e: CommanderError): void {
    e.exitCode && this.error(e)
    return void (process.exitCode = e.exitCode)
  }
}

export default ProgramModule
