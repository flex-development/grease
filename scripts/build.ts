#!/usr/bin/env node

import log from '@grease/utils/log.util'
import ch from 'chalk'
import { copyFileSync, existsSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import sh from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import fixNodeModulePaths from './fix-node-module-paths'
import exec from './utils/exec'
import pkg, { $name } from './utils/pkg-get'

/**
 * @file Scripts - Package Build Workflow
 * @module scripts/build
 */

export type BuildPackageOptions = {
  /**
   * Files to include in build. Files that are always included (if present):
   *
   * `CHANGELOG.md`
   * `LICENSE.md`
   * `package.json`
   * `README.md`
   */
  assets?: string[]

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
 * @property {string[]} BUILD_ASSETS - Distribution files
 */
const BUILD_ASSETS: string[] = ['CHANGELOG.md', 'LICENSE.md', 'README.md']

/**
 * @property {string} BUILD_DIR - Build directory
 */
const BUILD_DIR: string = 'build'

/**
 * @property {string[]} BUILD_FORMATS - Module build formats
 */
const BUILD_FORMATS: BuildPackageOptions['formats'] = ['cjs', 'esm']

/**
 * @property {string} BUILD_PATH - Path to build directory
 */
const BUILD_PATH: string = join(process.cwd(), BUILD_DIR)

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
  .option('assets', {
    alias: 'a',
    array: true,
    default: [],
    description: 'files to include in build'
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

// Remove stale build directory
exec(`rimraf ${BUILD_DIR}`, argv.dryRun)
log(argv, `remove stale ${BUILD_DIR} directory`)

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

  // Check if config file already exists
  const has_tsconfig = existsSync(tsconfig_path)

  // Copy config file if base does not exist
  if (!has_tsconfig) {
    if (!argv.dryRun) copyFileSync(join('..', '..', tsconfig), tsconfig)
  }

  // Run build command
  if (exec(`ttsc -p ${tsconfig}`, argv.dryRun) || argv.dryRun) {
    log(argv, `create ${BUILD_DIR}/${format}`)
  }

  // Remove config file
  if (!HAS_TSCONFIG) exec(`rimraf ${tsconfig}`, argv.dryRun)
})

// Remove base TypeScript config file
if (!HAS_TSCONFIG && !argv.dryRun) exec(`rimraf ${TSCONFIG_PROD}`, argv.dryRun)

// Fix node module import paths
fixNodeModulePaths()

// Copy build assets
BUILD_ASSETS.concat(argv?.assets ?? []).forEach(file => {
  if (existsSync(join(process.cwd(), file))) {
    exec(`copyfiles ${file} ${BUILD_DIR}`, argv.dryRun)
    log(argv, `create ${BUILD_DIR}/${file}`)
  } else {
    log(argv, `skipped ${file} -> ${BUILD_DIR}/${file}`, [], 'warning')
  }
})

// Get copy of package.json
const pkgjson = pkg()

// Reset `publishConfig#directory`
if (!pkgjson.publishConfig) pkgjson.publishConfig = {}
pkgjson.publishConfig.directory = './'

// Reset `main`, `module`, and `types`
pkgjson.main = pkgjson.main?.replace(`${BUILD_DIR}/`, '')
pkgjson.module = pkgjson.module?.replace(`${BUILD_DIR}/`, '')
pkgjson.types = pkgjson.types?.replace(`${BUILD_DIR}/`, '')

// Remove `devDependencies` `files`, and `scripts` from package.json
Reflect.deleteProperty(pkgjson, 'devDependencies')
Reflect.deleteProperty(pkgjson, 'files')
Reflect.deleteProperty(pkgjson, 'scripts')

// Stringify package.json data
const pkgjson_string = JSON.stringify(pkgjson, null, 2)

// Create package.json in build directory
if (!argv.dryRun) writeFileSync(`${BUILD_PATH}/package.json`, pkgjson_string)
log(argv, `create ${BUILD_DIR}/package.json`)
if (argv.dryRun) sh.echo(ch.gray(`\n---\n${pkgjson_string}\n---\n`))

log(argv, `create ${BUILD_DIR}/package.json`)

// Log workflow end
log(argv, 'build workflow complete', [$name], 'info')
