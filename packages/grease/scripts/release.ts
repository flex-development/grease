#!/usr/bin/env node

import type { ObjectPlain } from '@flex-development/tutils'
import grease from '@grease'
import type { IGreaseOptions } from '@grease/interfaces'
import log from '@grease/utils/log.util'
import ch from 'chalk'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import sh from 'shelljs'
import util from 'util'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import defaults from '../../../.versionrc'
import exec from '../../../scripts/exec'
import pkg from '../package.json'

/**
 * @file Scripts - Package Release
 * @module packages/grease/scripts/release
 */

export type ReleaseOptions = {
  commitAll?: IGreaseOptions['commitAll']
  dryRun?: IGreaseOptions['dryRun']
  firstRelease?: IGreaseOptions['firstRelease']
  prerelease?: IGreaseOptions['prerelease']
  releaseAs?: IGreaseOptions['releaseAs']
}

/**
 * @property {yargs.Argv} args - Command line arguments parser
 * @see https://github.com/yargs/yargs
 */
const args = yargs(hideBin(process.argv))
  .usage('$0 [options]')
  .option('commit-all', {
    alias: 'a',
    default: true,
    describe: 'commit all staged changes, not just files affected by grease',
    type: 'boolean'
  })
  .option('dry-run', {
    describe: 'see the commands that running grease would run',
    type: 'boolean'
  })
  .option('first-release', {
    alias: 'f',
    describe: 'is this the first release?',
    type: 'boolean'
  })
  .option('prerelease', {
    alias: 'p',
    describe: 'make prerelease with optional value to specify tag id',
    string: true
  })
  .option('release-as', {
    alias: 'r',
    describe: 'specify release type (like npm version <major|minor|patch>)',
    requiresArg: true,
    string: true
  })
  .alias('help', 'h')
  .pkgConf('release')
  .wrap(98)

/**
 * @property {string} BRANCH - Name of current branch
 */
const BRANCH = exec('git rev-parse --abbrev-ref HEAD', false, { silent: true })

/**
 * @property {IGreaseOptions} argv - Command line arguments
 */
const argv: IGreaseOptions = merge(
  {},
  defaults,
  pick(args.argv as IGreaseOptions, [
    'commitAll',
    'dryRun',
    'firstRelease',
    'prerelease',
    'releaseAs'
  ])
)

// Spread `package.json` data
const { name, publishConfig = {}, version } = pkg
const { branch_whitelist } = publishConfig as ObjectPlain

/**
 * @property {string} name_no_scope - Package name without scope
 */
const name_no_scope: string = (name as string).split('/')[1]

// Log workflow start
log(argv, `starting release workflow: ${name}`, [], 'info')

grease({
  ...argv,
  lernaPackage: name_no_scope,
  releaseAssets: [`${name?.replace('/', '-')}-${version}.tgz`],
  releaseBranchWhitelist: branch_whitelist || argv.releaseBranchWhitelist,
  releaseCommitMessageFormat: `chore(release): ${name}@{{currentTag}}`,
  scripts: {
    postchangelog: `yarn pack -o %s-%v.tgz${argv.dryRun ? ' -n' : ''}`,
    postrelease: 'rimraf ./*.tgz',
    posttag: `git push --follow-tags origin ${BRANCH} --no-verify`
  },
  tagPrefix: `${name_no_scope}@`
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
