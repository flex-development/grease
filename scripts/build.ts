#!/usr/bin/env node

import Exception from '@flex-development/exceptions/exceptions/base.exception'
import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import logger from '@grease/utils/logger.util'
import { copyFileSync, existsSync } from 'fs-extra'
import { join } from 'path'
import sh from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import fixNodeModulePaths from './fix-node-module-paths'
import prepackDisable from './prepack-disable'
import prepackEnable from './prepack-enable'
import exec from './utils/exec'
import { $name } from './utils/pkg-get'

/**
 * @file Scripts - Build Workflow
 * @module scripts/build
 */

export type BuildOptions = {
  /**
   * Name of build environment.
   *
   * @default 'production'
   */
  env?: 'development' | 'production' | 'test'

  /** @see BuildOptions.env */
  e?: BuildOptions['env']

  /**
   * See the commands that running `build` would run.
   *
   * @default false
   */
  dryRun?: boolean

  /** @see BuildOptions.dryRun */
  d?: BuildOptions['dryRun']

  /**
   * Specify module build formats.
   *
   * @default ['cjs','esm']
   */
  formats?: ('cjs' | 'esm')[]

  /** @see BuildOptions.formats */
  f?: BuildOptions['formats']

  /**
   * Run preliminary `yarn install` if package contains build scripts.
   *
   * @default false
   */
  packInstall?: boolean

  /** @see BuildOptions.packInstall */
  i?: BuildOptions['packInstall']

  /**
   * Create tarball at specified path.
   *
   * @default '%s-%v.tgz'
   */
  out?: string

  /** @see BuildOptions.out */
  o?: BuildOptions['out']

  /**
   * Run `prepack` script.
   *
   * @default false
   */
  prepack?: boolean

  /** @see BuildOptions.prepack */
  p?: BuildOptions['prepack']

  /**
   * Pack the project once build is complete.
   *
   * @default false
   */
  tarball?: boolean

  /** @see BuildOptions.tarball */
  t?: BuildOptions['tarball']
}

/**
 * @property {string[]} BUILD_FORMATS - Module build formats
 */
const BUILD_FORMATS: BuildOptions['formats'] = ['cjs', 'esm']

/**
 * @property {string[]} ENV_CHOICES - Build environment options
 */
const ENV_CHOICES: BuildOptions['env'][] = ['production', 'test', 'development']

/**
 * @property {string} COMMAND_PACK - Base pack command
 */
const COMMAND_PACK: string = 'yarn pack'

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
    choices: ENV_CHOICES,
    default: 'production',
    describe: 'name of build environment',
    requiresArg: true,
    string: true,
    type: 'string'
  })
  .option('dry-run', {
    alias: 'd',
    boolean: true,
    default: false,
    describe: 'see the commands that running `build` would run',
    type: 'boolean'
  })
  .option('formats', {
    alias: 'f',
    array: true,
    choices: BUILD_FORMATS,
    default: BUILD_FORMATS,
    description: 'specify module build format(s)'
  })
  .option('out', {
    alias: 'o',
    default: '%s-%v.tgz',
    description: 'create tarball at specified path',
    requiresArg: true,
    string: true,
    type: 'string'
  })
  .option('pack-install', {
    alias: 'i',
    boolean: true,
    default: false,
    description: 'run `yarn install` if package contains build scripts'
  })
  .option('prepack', {
    alias: 'p',
    boolean: true,
    default: false,
    description: 'run `prepack` script'
  })
  .option('tarball', {
    alias: 't',
    boolean: true,
    default: false,
    description: 'pack the project once build is complete'
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .pkgConf('build')
  .wrap(98)

/**
 * @property {BuildOptions} argv - Command line arguments
 */
const argv: BuildOptions = args.argv as BuildOptions

// Log workflow start
logger(
  argv,
  'starting build workflow',
  [$name, `[dry=${argv.dryRun}]`],
  LogLevel.INFO
)

try {
  // Set environment variables
  exec(`dotenv -c ${argv.env} -- true`, argv.dryRun)
  logger(argv, `set ${argv.env} environment variables`)

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
    logger(argv, `remove stale ${format} directory`)

    // Check if config file already exists
    const has_tsconfig = existsSync(tsconfig_path)

    // Copy config file if base does not exist
    if (!has_tsconfig && !argv.dryRun) {
      copyFileSync(join('..', '..', tsconfig), tsconfig)
    }

    // Run build command
    if (exec(`ttsc -p ${tsconfig}`, argv.dryRun) || argv.dryRun) {
      logger(argv, `create ${format}`)
    }

    // Remove config file
    if (!HAS_TSCONFIG) exec(`rimraf ${tsconfig}`, argv.dryRun)
  })

  // Remove base TypeScript config file
  if (!HAS_TSCONFIG && !argv.dryRun)
    exec(`rimraf ${TSCONFIG_PROD}`, argv.dryRun)

  // Fix node module import paths
  fixNodeModulePaths()

  // Pack project
  if (argv.tarball) {
    const dry = `${argv.dryRun ? '--dry-run' : ''}`
    const out = `--out ${argv.out}`
    const install = `${argv.packInstall ? '--install-if-needed' : ''}`

    // Disable prepack script
    if (!argv.prepack && !argv.dryRun) prepackDisable()

    // Execute pack command
    exec(`${COMMAND_PACK} ${out} ${install} ${dry}`.trim(), argv.dryRun)

    // Renable prepack script
    if (!argv.prepack && !argv.dryRun) prepackEnable()
  }
} catch (error) {
  const exception = error as Exception

  logger(argv, exception.message, [], LogLevel.ERROR)
  sh.exit(exception.data.code)
}

// Log workflow end
logger(argv, 'build workflow complete', [$name], LogLevel.INFO)
