# :gear: grease

Package release workflow tool

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Installation](#installation)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](CONTRIBUTING.md)

## Getting Started

`grease` is a package release workflow tool for Node.js environments. Built on
top of the [`standard-version`][5] library, it helps maintainers create releases
and upload release assets via the [GitHub CLI][2].

Release notes can be generated using the `CHANGELOG` entry for the most recent
semver tag. Maintainers also have the option of generating blank notes, notes in
birthday (first release) format, or skipping note generation entirely.

## Installation

```zsh
yarn add -D @flex-development/grease # or npm i -D @flex-development/grease
```

## Usage

### Configuration

[Configuration options][8] are passed via the [`main`](src/main) method.

Options can be used to configure both `grease` and `standard-version`. Refer to
the [`standard-version` docs][5] and [conventional-changelog-config-spec][9] for
details on options specific to `standard-version`.

### Prereleases

Use the `prerelease` option to generate prereleases:

Suppose the last version of your code is `1.0.0`, and your code to be committed
has patched changes. Run:

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  prerelease: ''
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

This will tag your version as: `1.0.1-0`.

If you want to name the prerelease, specify the name:

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  prerelease: 'alpha'
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

This will tag the version as: `1.0.1-alpha.0`.

#### Auto Detection

Assuming the value of `prerelease` is included in a package version (e.g
`3.13.98-dev.640`), `grease` can autodetect the value.

Suppose the last version of your code is `foo-package@2.0.0-alpha`, and your
code to be committed has patched changes. Run:

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  lernaPackage: 'foo-package',
  tagPrefix: 'foo-package@'
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

This will tag the version as: `2.0.1-alpha.0`.

In cases where the `prerelease` value found is not the one intended (e.g
`3.0.0-rc`), use `prereleaseMap` to interpolate values.

Suppose the last version of your code is `foo-package@3.0.0-rc`, and your code
to be committed has patched changes. Run:

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  lernaPackage: 'foo-package',
  prereleaseMap: new Map([['rc', 'beta']]),
  tagPrefix: 'foo-package@'
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

This will tag the version as: `3.0.1-beta.0`.

To opt-of of auto detection, use `prereleaseSkip`:

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  lernaPackage: 'foo-package',
  prereleaseSkip: true,
  tagPrefix: 'foo-package@'
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

### Lifecycle Scripts

`grease` supports lifecycle scripts. These allow you to execute your own
supplementary commands during the release. The following hooks are available and
execute in the order documented:

- `prerelease`: called before anything happens. If a non-zero exit code is
  returned, versioning will be aborted (has no other effect on workflow though)
- `prebump`/`postbump`: called before and after the version is bumped. If a
  version number is returned it will be used instead of the version calculated
- `prechangelog`/`postchangelog`: called before and after `CHANGELOG` generation
- `precommit`/`postcommit`: called before and after the commit step
- `pretag`/`posttag`: called before and after the tagging step
- `predepchecker`/`postdepchecker`: called before and after dependency checks
- `prenotes`/`postnotes`: called before and after release notes generation
- `pregreaser`/`postgreaser`: called before and after github release

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  commitAll: true,
  infile: 'docs/CHANGELOG.md',
  scripts: {
    postchangelog: 'yarn pack -o %s-%v.tgz',
    postrelease: 'rimraf ./*.tgz'
  },
  verify: false
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

### Skipping Lifecycle Events

You can skip any of the lifecycle events (`bump`, `changelog`, `commit`, `tag`,
`depchecker`, `notes`, `greaser`):

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  skip: { greaser: true }
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

**Note**: Skipping the `depchecker` lifecycle will force `grease` to skip the
`greaser` lifecycle as well.

### Generating Release Notes

By default, release notes are generated using the `CHANGELOG` entry for the most
latest semantic version (returned by the `bump` lifecycle) tag. Maintainers also
have the option of generating blank notes, notes in birthday (first release)
format, or skipping note generation entirely.

#### Birthday Notes

```typescript
import grease from '@flex-development/grease'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  firstRelease: true,
  verify: false
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

_**or**_

```typescript
import grease from '@flex-development/grease'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  notesType: NotesType.BIRTHDAY,
  verify: false
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

#### Blank Notes

```typescript
import grease from '@flex-development/grease'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  notesType: NotesType.BLANK,
  verify: false
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

#### Skipped Notes

Release notes can be skipped **without** setting `options.skip.notes`. Instead,
set `options.notesType` to `NotesType.NULL`.

```typescript
import grease from '@flex-development/grease'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import sh from 'shelljs'
import util from 'util'

grease({
  notesType: NotesType.NULL,
  verify: false
}).catch(error => {
  if (error.stderr) return
  else sh.echo(ch.bold.red(util.inspect(error, false, null)))
})
```

### Creating GitHub Releases

`grease` uses the [GitHub CLI][2] to create new GitHub releases. Below is the
[workflow script](../../scripts/release.ts) `grease` uses to draft new releases:

```typescript
#!/usr/bin/env node

import grease from '@flex-development/grease'
import type { IGreaseOptions } from '@flex-development/grease/interfaces'
import log from '@flex-development/grease/utils/log.util'
import ch from 'chalk'
import merge from 'lodash.merge'
import pick from 'lodash.pick'
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
```

## Built With

- [chalk][1] - Terminal string styling
- [cli][2] - GitHub CLI
- [debug][3] - Debugging utility
- [shelljs][4] - Unix shell commands for Node.js
- [standard-version][5] - [semver][6] versioning and CHANGELOG utility powered
  by [Conventional Commits][7]

[1]: https://github.com/chalk/chalk
[2]: https://cli.github.com/manual
[3]: https://github.com/visionmedia/debug
[4]: https://github.com/shelljs/shelljs
[5]: https://github.com/conventional-changelog/standard-version
[6]: https://git-scm.com
[7]:
  https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-semver-tags#readme
[8]: src/interfaces/grease-options.interface.ts
[9]:
  https://github.com/conventional-changelog/conventional-changelog-config-spec
