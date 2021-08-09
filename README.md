# :gear: grease

Package release workflow tool for Node.js and CLI environments

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Installation](#installation)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](CONTRIBUTING.md)

## Getting Started

How It Works:

1. Follow the [Conventional Commits Specification][9] in your repository
2. When you're ready to release, run `grease(options: IGreaseOptions)`

`grease` will then do the following:

1. Retrieve the current package version by looking at [`packageFiles`][10],
   falling back to the last `git tag` (if enabled)
2. `bump` the version in [`bumpFiles`][10] based on your commits
3. Generate a commit-based `changelog` (uses [conventional-changelog][11] under
   the hood)
4. Create a new `commit` including [`bumpFiles`][10] and updated `CHANGELOG`
5. Create a new `tag` with the new version number
6. Check if the [GitHub CLI][2] is installed
7. Generate [release notes](src/grease/README.md#generating-release-notes)
8. Create a new [GitHub release][12]

## Usage

This project is organized as a monorepo. See each package for detailed usage
instructions.

### [@flex-development/grease](packages/grease/README.md#usage)

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
[9]: https://www.conventionalcommits.org/en/v1.0.0
[10]:
  https://github.com/conventional-changelog/standard-version#bumpfiles-packagefiles-and-updaters
[11]: https://github.com/conventional-changelog/conventional-changelog
[12]: https://cli.github.com/manual/gh_release_create
