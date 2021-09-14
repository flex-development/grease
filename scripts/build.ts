#!/usr/bin/env node

import Exception from '@flex-development/exceptions/exceptions/base.exception'
import log from '@grease/utils/log.util'
import { copyFileSync, existsSync } from 'fs-extra'
import { join } from 'path'
import sh from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import fixNodeModulePaths from './fix-node-module-paths'
import exec from './utils/exec'
import { $name } from './utils/pkg-get'

/**
 * @file Scripts - Package Build Workflow
 * @module scripts/build-pkg
 */

export type BuildPackageOptions = {
  /**
   * Name of build environment.
   *
   * @default 'production'
   */
  env?: 'development' | 'production' | 'test'

  /**
   * See the commands that running `build` would run.
   */
  dryRun?: boolean

  /**
   * Specify module build formats.
   */
  formats?: ('cjs' | 'esm')[]
}

/**
 * @property {string[]} BUILD_FORMATS - Module build formats
 */
const BUILD_FORMATS: BuildPackageOptions['formats'] = ['cjs', 'esm']

/**
 * @property {string} TSCONFIG_PROD - Base production config file
 */
const TSCONFIG_PROD: string = 'tsconfig.prod.json'

/**
 * @property {yargs.Argv} args - Command line arguments parser
 * @see https://github.com/yargs/yargs
 */
const args = yargs(hideBin(process.argv))
  .usage('$0 [options]')
  .option('env', {
    alias: 'e',
    default: 'production',
    describe: 'name of build environment',
    requiresArg: true,
    type: 'string'
  })
  .option('dry-run', {
    alias: 'd',
    boolean: true,
    default: false,
    describe: 'see the commands that running build would run',
    type: 'boolean'
  })
  .option('formats', {
    alias: 'f',
    array: true,
    choices: BUILD_FORMATS,
    default: BUILD_FORMATS,
    description: 'specify module build format(s)'
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .pkgConf('build')
  .wrap(98)

/**
 * @property {BuildPackageOptions} argv - Command line arguments
 */
const argv: BuildPackageOptions = args.argv as BuildPackageOptions

// Log workflow start
log(argv, 'starting build workflow', [$name, `[dry=${argv.dryRun}]`], 'info')

try {
  // Set environment variables
  exec(`dotenv -c ${argv.env} -- true`, argv.dryRun)
  log(argv, `set ${argv.env} environment variables`)

  // Check if base TypeScript config file already exists
  const HAS_TSCONFIG = existsSync(join(process.cwd(), TSCONFIG_PROD))

  // Copy base TypeScript config file if base does not exist
  if (!HAS_TSCONFIG && !argv.dryRun) {
    copyFileSync(join('..', '..', TSCONFIG_PROD), TSCONFIG_PROD)
  }

  // Build project with ttypescript - https://github.com/cevek/ttypescript
  argv.formats?.forEach(format => {
    // Get tsconfig config file and path
    const tsconfig: string = `tsconfig.prod.${format}.json`
    const tsconfig_path: string = join(process.cwd(), tsconfig)

    // Remove stale directory
    exec(`rimraf ${format} directory`, argv.dryRun)
    log(argv, `remove stale ${format} directory`)

    // Check if config file already exists
    const has_tsconfig = existsSync(tsconfig_path)

    // Copy config file if base does not exist
    if (!has_tsconfig && !argv.dryRun) {
      copyFileSync(join('..', '..', tsconfig), tsconfig)
    }

    // Run build command
    if (exec(`ttsc -p ${tsconfig}`, argv.dryRun) || argv.dryRun) {
      log(argv, `create ${format}`)
    }

    // Remove config file
    if (!HAS_TSCONFIG) exec(`rimraf ${tsconfig}`, argv.dryRun)
  })

  // Remove base TypeScript config file
  if (!HAS_TSCONFIG && !argv.dryRun)
    exec(`rimraf ${TSCONFIG_PROD}`, argv.dryRun)

  // Fix node module import paths
  fixNodeModulePaths()
} catch (error) {
  const exception = error as Exception

  log(argv, exception.message, [], 'error')
  sh.exit(exception.data.code)
}

// Log workflow end
log(argv, 'build workflow complete', [$name], 'info')
