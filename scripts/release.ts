#!/usr/bin/env node

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
import { $name, $name_no_scope, $version } from './utils/pkg-get'

/**
 * @file Scripts - Release Workflow
 * @module scripts/release
 */

export type ReleaseOptions = {
  /**
   * Commit all staged changes, not just release files.
   *
   * @default true
   */
  commitAll?: IGreaseOptions['commitAll']

  /**
   * See the commands that running release would run.
   *
   * @default false
   */
  dryRun?: IGreaseOptions['dryRun']

  /**
   * Is this the first release?
   *
   * @default false
   */
  firstRelease?: IGreaseOptions['firstRelease']

  /**
   * Create a prerelease with optional tag id (e.g: `alpha`,`beta`, `dev`).
   */
  prerelease?: IGreaseOptions['prerelease']

  /**
   * Specify release type (like `npm version <major|minor|patch>`).
   */
  releaseAs?: IGreaseOptions['releaseAs']

  /**
   * Save GitHub release as a draft instead of publishing it.
   *
   * @default true
   */
  releaseDraft?: IGreaseOptions['releaseDraft']

  /**
   * Map of steps in the release process that should be skipped.
   *
   * @default true
   */
  skip?: IGreaseOptions['skip']
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
    describe: 'commit all staged changes, not just release files',
    type: 'boolean'
  })
  .option('dry-run', {
    default: false,
    describe: 'see the commands that running release would run',
    type: 'boolean'
  })
  .option('first-release', {
    alias: 'f',
    default: false,
    describe: 'is this the first release?',
    type: 'boolean'
  })
  .option('release-as', {
    alias: 'r',
    describe: 'specify release type (like npm version <major|minor|patch>)',
    requiresArg: true,
    string: true
  })
  .option('release-draft', {
    default: true,
    describe: 'release as a draft instead of publishing it',
    type: 'boolean'
  })
  .option('skip', {
    describe: 'map of steps in the release process that should be skipped'
  })
  .alias('help', 'h')
  .pkgConf('release')
  .wrap(98)

/**
 * @property {IGreaseOptions & ReleaseOptions} argv - Command line arguments
 */
const argv: IGreaseOptions & ReleaseOptions = pick(
  args.argv as IGreaseOptions & ReleaseOptions,
  [
    'commitAll',
    'dryRun',
    'firstRelease',
    'prerelease',
    'releaseAs',
    'releaseDraft',
    'skip'
  ]
)

/**
 * @property {IGreaseOptions} options - `grease` options
 */
const options: IGreaseOptions = {
  commitAll: true,
  gitTagFallback: false,
  gitdir: process.env.PROJECT_CWD,
  lernaPackage: $name_no_scope,
  path: process.cwd(),
  prerelease: ((): string | undefined => {
    const tag = $version.split('-')[1]
    return !tag ? undefined : tag.includes('.') ? tag.split('.')[0] : tag
  })(),
  releaseAssets: ['./*.tgz'],
  releaseBranchWhitelist: ['release/*'],
  releaseCommitMessageFormat: `release: ${$name}@{{currentTag}}`,
  scripts: {
    postchangelog: `yarn pack -o %s-%v.tgz${argv.dryRun ? ' -n' : ''}`,
    postcommit: 'git pnv',
    postgreaser: 'rimraf ./*.tgz',
    prerelease: 'yarn test --no-cache'
  },
  // `continuous-deployment` workflow will create new tag
  skip: { tag: true },
  skipUnstable: false,
  tagPrefix: `${$name_no_scope}@`,
  types: [
    /* eslint-disable sort-keys */
    { type: 'feat', section: ':sparkles: Features' },
    { type: 'fix', section: ':bug: Fixes' },
    { type: 'revert', section: ':rewind: Revert' },
    { type: 'test', section: ':robot: Testing' },
    { type: 'docs', section: ':book: Documentation' },
    { type: 'build', section: ':hammer: Build' },
    { type: 'refactor', section: ':recycle: Code Improvements' },
    { type: 'perf', section: ':zap: Performance Updates' },
    { type: 'style', section: ':nail_care: Formatting & Structure' },
    { type: 'ci', section: ':truck: Continuous Integration & Deployment' },
    { type: 'chore', section: ':pencil2: Housekeeping' },
    { type: 'wip', hidden: true }
    /* eslint-enable sort-keys */
  ],
  verify: false
}

// Log workflow start
log(argv, 'starting release workflow', [$name, `[dry=${argv.dryRun}]`], 'info')

// Run release workflow
grease(merge({}, options, argv)).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
