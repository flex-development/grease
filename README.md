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

`grease` is a package release workflow tool for CLI and Node.js environments.

Built on top of the [`standard-version`][4] library, it helps maintainers create
releases and upload release assets via the [GitHub CLI][2].

Release notes can be generated using the `CHANGELOG` entry for the most recent
semver tag. Maintainers also have the option of generating blank notes, notes in
birthday (first release) format, or skipping note generation entirely.

### How It Works

1. Follow the [Conventional Commits Specification][8] in your repository
2. When ready to release, run `grease` or `grease(options: IGreaseOptions)`

`grease` will then do the following:

1. Retrieve the current package version by looking at [`packageFiles`][9],
   falling back to the last `git tag` (if enabled)
2. `bump` the version in [`bumpFiles`][9] based on your commits
3. Generate a commit-based `changelog` (uses [conventional-changelog][10] under
   the hood)
4. Create a new `commit` including [`bumpFiles`][9] and updated `CHANGELOG`
5. Create a new `tag` with the new version number
6. Check if the [GitHub CLI][2] is installed
7. Generate [release notes](src/grease/README.md#generating-release-notes)
8. Create a new [GitHub release][11]

## Usage

This project is organized as a monorepo. For detailed usage instructions, see
one of the project workspaces below:

- [@flex-development/grease](packages/grease/README.md#usage)

## Built With

- [chalk][1] - Terminal string styling
- [cli][2] - GitHub CLI
- [shelljs][3] - Unix shell commands for Node.js
- [standard-version][4] - [semver][5] versioning and CHANGELOG utility powered
  by [Conventional Commits][6]
- [yargs][7] - Optstring parser for Node.js

[1]: https://github.com/chalk/chalk
[2]: https://cli.github.com/manual
[3]: https://github.com/shelljs/shelljs
[4]: https://github.com/conventional-changelog/standard-version
[5]: https://git-scm.com
[6]:
  https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-semver-tags#readme
[7]: https://github.com/yargs/yargs
[8]: https://www.conventionalcommits.org/en/v1.0.0
[9]:
  https://github.com/conventional-changelog/standard-version#bumpfiles-packagefiles-and-updaters
[10]: https://github.com/conventional-changelog/conventional-changelog
[11]: https://cli.github.com/manual/gh_release_create
