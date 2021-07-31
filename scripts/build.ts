#!/usr/bin/env node

import ch from 'chalk'
import fse from 'fs-extra'
import path from 'path'
import readPackage from 'read-pkg'
import rimraf from 'rimraf'
import sh from 'shelljs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import fixNodeModulePaths from './fix-node-module-paths'

/**
 * @file Scripts - Package Build
 * @module scripts/build
 */

export type BuildPackageOptions = {
  /**
   * Specify module build formats.
   */
  formats?: ('cjs' | 'esm')[]
}

/**
 * @property {string} BUILD_DIR - Build directory
 */
const BUILD_DIR: string = path.join(process.cwd(), 'build')

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
  const file = (path: string): string => `.${path.split(`${process.cwd()}`)[1]}`

  try {
    // Log workflow start
    sh.echo(ch.yellow(`build workflow started: ${formats}`))

    // Remove build directory
    rimraf.sync(BUILD_DIR)
    sh.echo(ch.white(`✓ remove ${file(BUILD_DIR)}`))

    // Build project with ttypescript - https://github.com/cevek/ttypescript
    formats.forEach(format => {
      // Get tsconfig config file
      const tsconfig: string = `tsconfig.prod.${format}.json`

      // Run build command
      if (sh.exec(`ttsc -p ${tsconfig}`)) sh.echo(ch.white(`✓ build ${format}`))
    })

    // Fix node module import paths
    fixNodeModulePaths()

    // Get copy of `package.json`
    const pkgjson = readPackage.sync({ cwd: process.cwd() })

    // Remove `devDependencies` and `scripts` from package.json
    Reflect.deleteProperty(pkgjson, 'devDependencies')
    Reflect.deleteProperty(pkgjson, 'scripts')

    // Get `package.json` path in $BUILD_DIR
    const pkgjson_path_build = path.join(BUILD_DIR, 'package.json')

    // Create `package.json` file in $BUILD_DIR
    fse.writeFileSync(pkgjson_path_build, JSON.stringify(pkgjson, null, 2))
    sh.echo(ch.white(`✓ create ${file(pkgjson_path_build)}`))

    // Copy distribution files
    BUILD_FILES.forEach(buildfile => {
      const src = path.join(process.cwd(), buildfile)
      const dest = path.join(BUILD_DIR, buildfile)

      if (fse.existsSync(src)) {
        fse.copyFileSync(src, dest)
        sh.echo(ch.white(`✓ create ${file(dest)}`))
      } else {
        sh.echo(ch.yellow(`skipped ${file(src)} -> ${file(dest)}`))
      }
    })

    // End workflow
    sh.echo(ch.bold.green(`build workflow complete: ${formats}`))
  } catch (error) {
    sh.echo(ch.bold.red(`build workflow failed: ${formats}`))
    sh.echo(ch.red(error.message))
  }

  sh.exit(0)
}

build(args.argv as BuildPackageOptions)
