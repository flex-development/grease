/**
 * @file ProgramModule
 * @module grease/cli/ProgramModule
 */

import pkg from '#pkg' assert { type: 'json' }
import { BumpService, GitService, PackageService } from '#src/providers'
import { Program } from '@flex-development/nest-commander'
import type { CommanderError } from '@flex-development/nest-commander/commander'
import { lowercase } from '@flex-development/tutils'
import { Module } from '@nestjs/common'
import consola from 'consola'
import { BumpCommand } from './commands'

/**
 * CLI application module.
 *
 * @class
 */
@Module({ providers: [BumpCommand, BumpService, GitService, PackageService] })
class ProgramModule {
  /**
   * Create a new CLI application module.
   *
   * @param {Program} program - CLI program instance
   */
  constructor(protected readonly program: Program) {
    program.name(pkg.name.replace(/.*\//, ''))
    program.description(lowercase(pkg.description))
  }

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
    consola.error(e)
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
    e.exitCode && ProgramModule.error(e)
    return void (process.exitCode = e.exitCode)
  }
}

export default ProgramModule
