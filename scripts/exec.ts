import log from '@grease/utils/log.util'
import sh from 'shelljs'

/**
 * @file Shell Command Executor
 * @module scripts/exec
 */

/**
 * Executes a shell command or logs the command that would be run.
 *
 * @param {string} command - Command
 * @param {boolean} [dryRun=false] - Log command that would be run
 * @param {sh.ExecOptions} [options={}] - `sh.exec` options
 * @return {string} Command output
 */
const exec = (
  command: string,
  dryRun: boolean = false,
  options: sh.ExecOptions = {}
): string => {
  let stdout: string = ''

  command = command.trim()

  if (dryRun) log({}, command, [], 'warning')
  else stdout = sh.exec(command, options).toString().replaceAll('\n', '')

  return stdout
}

export default exec
