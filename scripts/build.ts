#!/usr/bin/env node

import ch from 'chalk'
import figures from 'figures'
import { copyFileSync, existsSync, removeSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { sync as readPackage } from 'read-pkg'
import rimraf from 'rimraf'
import sh from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import echo from './echo'
import fixNodeModulePaths from './fix-node-module-paths'

/**
 * @file Scripts - Package Build
 * @module scripts/build
 */

export type BuildPackageOptions = {
  /**
   * Specify module build formats.
   */
  formats?: ('cjs' | 'esm' | 'types')[]
}

/**
 * @property {string} BUILD_DIR - Build directory
 */
const BUILD_DIR: string = 'build'

/**
 * @property {string} BUILD_DIR_PATH - Build directory (full path)
 */
const BUILD_DIR_PATH: string = join(process.cwd(), BUILD_DIR)

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
  .option('formats', {
    alias: 'f',
    array: true,
    choices: BUILD_FORMATS,
    description: 'specify module build format(s)'
  })
  .alias('version', 'v')
  .alias('help', 'h')
  .pkgConf('@flex-development/build-ts-pkg')
  .version('1.0.0')
  .wrap(98)

/**
 * Builds TypeScript packages.
 *
 * @param {BuildPackageOptions} argv - CLI arguments object
 * @return {void}
 */
const build = (argv: BuildPackageOptions): void => {
  const { formats = BUILD_FORMATS } = argv

  /**
   * Returns `path` relative to `process.env.PWD`.
   *
   * @param {string} path - File path
   * @return {string} Relative file path
   */
  const file = (path: string): string => `${path.split(`${process.cwd()}/`)[1]}`

  try {
    // Force `types` build
    if (!formats.includes('types')) formats.push('types')

    // Log workflow start
    echo(
      `build workflow started: ${formats}`,
      true,
      'white',
      ch.blue(figures.info)
    )

    // Remove build directory
    rimraf.sync(BUILD_DIR_PATH)
    echo(`remove ${BUILD_DIR} directory`)

    // Get base TypeScript config path
    const TSCONFIG_PATH = join(process.cwd(), TSCONFIG_PROD)

    // Check if base TypeScript config file already exists
    const HAS_TSCONFIG = existsSync(TSCONFIG_PATH)

    // Copy base TypeScript config file if base does not exist
    if (!HAS_TSCONFIG) {
      copyFileSync(
        join('..', '..', TSCONFIG_PROD),
        join(process.cwd(), TSCONFIG_PROD)
      )
    }

    // Build project with ttypescript - https://github.com/cevek/ttypescript
    formats.forEach(format => {
      // Get tsconfig config file and path
      const tsconfig: string = `tsconfig.prod.${format}.json`
      const tsconfig_path = join(process.cwd(), tsconfig)

      // Check if TypeScript config already exists
      const tsconfig_exists = existsSync(tsconfig_path)

      // Copy temporary TypeScript config file to current working directory
      if (!tsconfig_exists) {
        copyFileSync(join('..', '..', tsconfig), tsconfig_path)
      }

      // Run build command
      if (sh.exec(`ttsc -p ${tsconfig}`)) echo(`create build/${format}`)

      // Delete temporary config file
      if (!tsconfig_exists) removeSync(tsconfig_path)
    })

    // Remove base TypeScript config file
    if (!HAS_TSCONFIG) removeSync(TSCONFIG_PATH)

    // Fix node module import paths
    fixNodeModulePaths()

    // Get copy of package.json
    const pkgjson = readPackage({ cwd: process.cwd(), normalize: false })

    // Reset `main`, `module`, and `types`
    pkgjson.main = pkgjson.main?.replace(`${BUILD_DIR}/`, '')
    pkgjson.module = pkgjson.module?.replace(`${BUILD_DIR}/`, '')
    pkgjson.types = pkgjson.types?.replace(`${BUILD_DIR}/`, '')

    // Remove `devDependencies` and `scripts` from package.json
    Reflect.deleteProperty(pkgjson, 'devDependencies')
    Reflect.deleteProperty(pkgjson, 'scripts')

    // Add `_id` field
    pkgjson._id = `${pkgjson.name}@${pkgjson.version}`

    // Get package.json path in $BUILD_DIR_PATH
    const pkgjson_path_build = join(BUILD_DIR_PATH, 'package.json')

    // Create package.json file in $BUILD_DIR_PATH
    writeFileSync(pkgjson_path_build, JSON.stringify(pkgjson, null, 2))
    echo(`create ${file(pkgjson_path_build)}`)

    // Copy distribution files
    BUILD_FILES.forEach(buildfile => {
      const src = join(process.cwd(), buildfile)
      const dest = join(BUILD_DIR_PATH, buildfile)

      if (existsSync(src)) {
        copyFileSync(src, dest)
        echo(`create ${file(dest)}`)
      } else {
        echo(
          `skipped ${file(src)} -> ${file(dest)}`,
          false,
          'white',
          ch.yellow('!')
        )
      }
    })

    // End workflow
    echo(`build workflow complete: ${formats}`, true)
  } catch (error) {
    echo(`build workflow failed: ${formats}`, true, 'red', 'cross')
    echo(error.message, false, 'red', 'cross')
  }

  sh.exit(0)
}

build(args.argv as BuildPackageOptions)
