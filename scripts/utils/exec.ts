import { ExceptionStatusCode } from '@flex-development/exceptions/enums'
import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import logger from '@grease/utils/logger.util'
import type { ChildProcess } from 'child_process'
import type { ShellString } from 'shelljs'
import sh from 'shelljs'

/**
 * @file Script Utility - Shell Command Executor
 * @module scripts/utils/exec
 */

/**
 * Executes a shell command or logs the command that would be run.
 *
 * @param {string} command - Command
 * @param {boolean} [dryRun=false] - Log command that would be run
 * @param {sh.ExecOptions} [options={silent:true}] - `sh.exec` options
 * @return {string | void} Command output, command, or nothing
 * @throws {Exception}
 */
const exec = (
  command: string,
  dryRun: boolean = false,
  options: sh.ExecOptions = { silent: true }
): string | void => {
  let stdout: ChildProcess | ShellString | null = null

  command = command.trim()

  if (dryRun) logger({}, command, [], LogLevel.WARN)
  else stdout = sh.exec(command, options) as ShellString | null

  if (stdout && stdout.code !== 0) {
    const code = ExceptionStatusCode.INTERNAL_SERVER_ERROR

    throw new Exception(code, undefined, {
      code: stdout.code,
      message: (stdout.stderr || stdout.stdout).toString()
    })
  }

  if (stdout && stdout.length) return stdout.toString().replaceAll('\n', '')

  return command
}

export default exec
