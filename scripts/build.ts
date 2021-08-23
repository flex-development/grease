#!/usr/bin/env node

import log from '@grease/utils/log.util'
import { copyFileSync, existsSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { sync as readPackage } from 'read-pkg'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import fixNodeModulePaths from './fix-node-module-paths'
import exec from './utils/exec'
import { $name } from './utils/pkg-get'

/**
 * @file Scripts - Package Build Workflow
 * @module scripts/build
 */

export type BuildPackageOptions = {
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
 * @property {string} BUILD_DIR - Build directory
 */
const BUILD_DIR: string = 'build'

/**
 * @property {string[]} BUILD_FILES - Distribution files
 */
const BUILD_FILES: string[] = ['CHANGELOG.md', 'LICENSE.md', 'README.md']

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
log(argv, `starting build workflow`, [$name, `[dry=${argv.dryRun}]`], 'info')

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

// Create package.json in $BUILD_DIR
if (!argv.dryRun) {
  // Get copy of package.json
  const pkgjson = readPackage({ cwd: process.cwd(), normalize: false })

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

  // Add `_id` field
  pkgjson._id = `${pkgjson.name}@${pkgjson.version}`

  // Create package.json file
  writeFileSync(
    join(process.cwd(), BUILD_DIR, 'package.json'),
    JSON.stringify(pkgjson, null, 2)
  )
}

log(argv, `create ${BUILD_DIR}/package.json`)

// Copy distribution files
BUILD_FILES.forEach(file => {
  if (existsSync(join(process.cwd(), file))) {
    exec(`copyfiles ${file} ${BUILD_DIR}`, argv.dryRun)
    log(argv, `create ${BUILD_DIR}/${file}`)
  } else {
    log(argv, `skipped ${file} -> ${BUILD_DIR}/${file}`, [], 'warning')
  }
})

// Log workflow end
log(argv, `build workflow complete`, [$name], 'info')
