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

1. Authenticate with [GitHub Package Registry][8] (GPR)

   **NPM**

   ```properties
   //registry.npmjs.org/:_authToken=$PAT_GPR
   @flex-development:registry=https://npm.pkg.github.com/
   ```

   **Yarn 1**

   ```properties
   //registry.yarnpkg.com/:_authToken=$PAT_GPR
   @flex-development:registry=https://npm.pkg.github.com/
   ```

   **Yarn 2**

   ```yml
   npmScopes:
     flex-development:
       npmAlwaysAuth: true
       npmAuthToken: '${PAT_GPR}'
       npmRegistryServer: 'https://npm.pkg.github.com'
   ```

   where `$PAT_GPR` is [GitHub Personal Access Token][9] with at least the
   `read:packages` scope.

2. Add project to `dependencies`

   ```zsh
   yarn add @flex-development/grease # or npm i @flex-development/grease
   ```

## Usage

### Configuration

[Configuration options][10] are passed via the [`main`](src/main) method.

Options can be used to configure both `grease` and `standard-version`. Refer to
the [`standard-version` docs][5] and [conventional-changelog-config-spec][11]
for details on options specific to `standard-version`.

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
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import grease from '@flex-development/grease'

grease({
  infile: 'docs/CHANGELOG.md',
  noVerify: true,
  scripts: { prerelease: 'webpack -p --bail && git add <file(s) to commit>' }
}).catch((error: ExceptionJSON) => logger.error(error))
```

### Skipping Lifecycle Events

You can skip any of the lifecycle events (`bump`, `changelog`, `commit`, `tag`,
`depchecker`, `notes`, `greaser`):

```typescript
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import grease from '@flex-development/grease'

grease({
  skip: { greaser: true }
}).catch((error: ExceptionJSON) => logger.error(error))
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
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import grease from '@flex-development/grease'

grease({
  firstRelease: true,
  noVerify: true
}).catch((error: ExceptionJSON) => logger.error(error))
```

_**or**_

```typescript
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import grease from '@flex-development/grease'

grease({
  noVerify: true,
  notesType: NotesType.BIRTHDAY
}).catch((error: ExceptionJSON) => logger.error(error))
```

#### Blank Notes

```typescript
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import grease from '@flex-development/grease'

grease({
  noVerify: true,
  notesType: NotesType.BLANK
}).catch((error: ExceptionJSON) => logger.error(error))
```

#### Skipped Notes

Release notes can be skipped **without** setting `options.skip.notes`. Instead,
set `options.notesType` to `NotesType.NULL`.

```typescript
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import grease from '@flex-development/grease'

grease({
  noVerify: true,
  notesType: NotesType.NULL
}).catch((error: ExceptionJSON) => logger.error(error))
```

### Creating GitHub Releases

`grease` uses the [GitHub CLI][2] to create new GitHub releases.

```typescript
import type { ExceptionJSON } from '@flex-development/exceptions'
import logger from '@flex-development/grease/config/logger'
import { NotesType } from '@flex-development/grease/enums/notes-type'
import grease from '@flex-development/grease'
import pkg from '../package.json'

grease({
  lernaPackage: pkg.name,
  noVerify: true,
  notesType: NotesType.NULL,
  notesFile: 'RELEASE_NOTES.md',
  prerelease: 'beta'
  releaseAssets: ['CHANGELOG.md', 'LICENSE.md', 'README.md']
  releaseDraft: true,
  releaseTarget: 'main'
  releaseTitle: `${pkg.name}@${version}`
  repo: 'flex-development/grease'
  tagPrefix: '@'
}).catch((error: ExceptionJSON) => logger.error(error))
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
[8]: https://github.com/features/packages
[9]: https://github.com/settings/tokens/new
[10]: src/interfaces/grease-options.interface.ts
[11]:
  https://github.com/conventional-changelog/conventional-changelog-config-spec
