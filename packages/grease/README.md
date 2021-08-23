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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
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
}).catch(error => sh.echo(ch.bold.red(util.inspect(error, false, null))))
```

### Creating GitHub Releases

`grease` uses the [GitHub CLI][2] to create new GitHub releases. Below is the
[workflow script](scripts/release.ts) `grease` uses to draft new releases:

```typescript
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
