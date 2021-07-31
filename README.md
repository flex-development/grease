# :gear: grease

Package release workflow tool

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Installation](#installation)  
[🚧 Usage](#usage)  
[Built With](#built-with)  
[Contributing](CONTRIBUTING.md)

## Getting Started

**`grease`** is a package release workflow tool for Node and CLI environments.

Built on top of the [`standard-version`][5] library, it helps project
maintainers create releases and upload release assets via the [GitHub CLI][2].

By default, release notes are generated using the `CHANGELOG` entry for the most
recent semver tag. Maintainers also have the option of generating a blank note,
or skipping note generation entirely.

## Installation

1. Authenticate with [GitHub Package Registry][9] (GPR)

   **NPM**

   ```properties
   //registry.npmjs.org/:_authToken=$GITHUB_PAT_GPR
   @flex-development:registry=https://npm.pkg.github.com/
   ```

   **Yarn 1**

   ```properties
   //registry.yarnpkg.com/:_authToken=$GITHUB_PAT_GPR
   @flex-development:registry=https://npm.pkg.github.com/
   ```

   **Yarn 2**

   ```yml
   npmScopes:
     flex-development:
       npmAlwaysAuth: true
       npmAuthToken: '${GITHUB_PAT_GPR}'
       npmRegistryServer: 'https://npm.pkg.github.com'
   ```

   where `$GITHUB_PAT_GPR` is [GitHub Personal Access Token][10] with at least
   the `read:packages` scope.

2. Add project to `dependencies`

   ```zsh
   yarn add @flex-development/grease # or npm i @flex-development/grease
   ```

## Usage

**TODO**: Update documentation.

## Built With

- [chalk][1] - Terminal string styling
- [cli][2] - GitHub CLI
- [debug][3] - Debugging utility
- [shelljs][4] - Unix shell commands for Node.js
- [standard-version][5] - [semver][6] versioning and CHANGELOG utility powered
  by [Conventional Commits][7]
- [yargs][8] - Optstring parser for Node.js

[1]: https://github.com/chalk/chalk
[2]: https://cli.github.com/manual
[3]: https://github.com/visionmedia/debug
[4]: https://github.com/shelljs/shelljs
[5]: https://github.com/conventional-changelog/standard-version
[6]: https://git-scm.com
[7]:
  https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-semver-tags#readme
[8]: https://github.com/yargs/yargs
[9]: https://github.com/features/packages
[10]: https://github.com/settings/tokens/new
