# Contributing Guide

This document aims to describe the workflows and rules used for developing this
project. This includes, but is not limited to:

- how to contribute code (coding standards, testing, documenting source code)
- how pull requests are handled
- how to file bug reports

## Overview

[Getting Started](#getting-started)  
[Contributing Code](#contributing-code)  
[Pull Requests & Code Reviews](#pull-requests-&-code-reviews)  
[Opening Issues](#opening-issues)

## Getting Started

### Environment Variables

All project environment variables in `package.json`, under the `env.optional`
and `env.required` fields.

### Git Configuration

The examples in this guide contain references to custom Git aliases.

Copy the [starter Git global configuration](.github/.gitconfig) to follow along
fully, as well as begin extending your own workflow.

### Terminology

People interacting with the `grease` project are grouped into 4 categories:

- **owner**: `flex-development` organization owners with full admin rights
- **maintainer**: owners and people added to the organization who actively
  contribute to projects and have direct push access
- **contributor**: someone who has helped improve any projects, but does not
  have direct push access
- **user**: developers who use any `flex-development` projects and may or may
  not participate in discussions regarding a given project

#### Additional Terminology

- **contribution**:
  - new features
  - engaging in discussions for new feature requests
  - documentation fixes
  - bug reports with reproducible steps
  - answering questions
- **ticket**: [JIRA][1] issue

## Contributing Code

[Husky][2] is used to run Git hooks that locally enforce coding and commit
message standards, as well run tests associated with any files changed since the
last commit.

Any code merged into the [development and production branches](#branching-model)
must confront the following criteria:

- changes should be discussed prior to implementation
- changes have been tested properly
- changes should include documentation updates if applicable
- changes have an associated ticket and pull request

### Branching Model

- Development: `next`
- Production: `main`

### Branch Prefixes

When creating a new branch, the name should match the following format:

```zsh
[prefix]/<TICKET-ID>-<branch_name>
 │           │      │
 │           │      └─⫸ a short, memorable name (possibly the future PR title)
 │           │
 │           └─⫸ check jira issue
 │
 └─⫸ bugfix|feat|hotfix|release
```

For example:

```zsh
git feat P010-1-repository-setup
```

will create a new branch titled `feat/P010-1-repository-setup`.

### Commit Messages

This project follows [Conventional Commit][3] standards and uses [commitlint][4]
to enforce those standards.

This means every commit must conform to the following format:

```zsh
<type>[optional scope]: <description>
 │     │                │
 │     │                └─⫸ summary in present tense; lowercase without period at the end
 │     │
 │     └─⫸ see commitlint.config.js
 │
 └─⫸ build|ci|chore|docs|feat|fix|perf|refactor|revert|style|test|wip

[optional body]

[optional footer(s)]
```

`<type>` must be one of the following values:

- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Changes that don't impact external users
- `docs`: Documentation only changes
- `feat`: New features
- `fix`: Bug fixes
- `perf`: Performance improvements
- `refactor`: Code improvements
- `revert`: Revert past changes
- `style`: Changes that do not affect the meaning of the code
- `test`: Adding missing tests or correcting existing tests
- `wip`: Working on changes, but you need to go to bed :wink:

For example:

```zsh
git chore "add eslint configuration"
```

will produce the following commit: `chore: add eslint configuration`

To include an inline code snippet in your commit message, be sure to escape your
backticks:

```zsh
git ac "feat(lifecycles): \`greaser-notes\`"
```

See [`commitlint.config.js`](commitlint.config.js) for an exhasutive list of
valid commit scopes and types.

### Code Style

[Prettier][5] is used to format code, and [ESLint][6] to lint files.

**Prettier Configuration**

- [`.prettierrc.js`](.prettierrc.js)
- [`.prettierignore`](.prettierignore)

**ESLint Configuration**

- [`.eslintrc.js`](.eslintrc.js)
- [`.eslintignore`](.eslintignore)

### Making Changes

All source code can be found in the [`src`](src) directory.

The purpose of each file should be documented using the `@file` annotation,
along with an accompanying `@module` annotation.

### Documentation

- JavaScript & TypeScript: [JSDoc][7], linted with [`eslint-plugin-jsdoc`][8]

Before making a pull request, be sure your code is well documented, as it will
be part of your code review.

### Testing

This project uses [Jest][9] as its test runner. To run _all_ the tests in this
project, run `yarn test` from the project root.

Husky is configured to run tests before every push. Use [`describe.skip`][10] or
[`it.skip`][11] if you need to create a new issue regarding the test, or need to
make a `wip` commit.

### Getting Help

If you need help, make note of any issues in their respective files. Whenever
possible, create a test to reproduce the error. Make sure to label your issue as
`type:question` and `status:help-wanted`.

## Labels

The `hooks` repository uses a well-defined list of labels to organize tickets
and pull requests. Most labels are grouped into different categories (identified
by the prefix, eg: `status:`).

A list of labels can be found in [`.github/labels.yml`](.github/labels.yml).

## Pull Requests

When you're ready to have your changes reviewed, open a pull request against the
`next` branch.

Every opened PR should:

- use [**this template**](.github/PULL_REQUEST_TEMPLATE.md)
- reference it's ticket id
- be [labeled](#labels) appropriately
- be assigned to yourself
- give maintainers push access so quick fixes can be pushed to your branch

The [Continuous Integration workflow](workflows/continuous-integration.yml) will
test your changes against coding standards, as well run all of the tests in this
project.

### Pull Request URL Format

```zsh
https://github.com/flex-development/grease/compare/next...<branch>
```

where `<branch>` is the name of the branch you'd like to merge into `next`.

### Merge Strategies

In every repository, the `create a merge commit` and `squash and merge` options
are enabled.

- if a PR has a single commit, or the changes across commits are logically
  grouped, use `squash and merge`
- if a PR has multiple commits, not logically grouped, `create a merge commit`

When merging, please make sure to use the following commit message format:

```txt
merge: <TICKET-ID> (pull request #n)
        │            │
        │            └─⫸ check your pull request
        │
        └─⫸ check jira issue
```

e.g: `merge: P010-1 (pull request #1)`

## Opening Issues

Before opening an issue please make sure, you have:

- read the documentation
- searched open issues for an existing issue with the same topic
- search closed issues for a solution or feedback

If you haven't found a related open issue, or feel that a closed issue should be
re-visited, please open a new issue. A well-written issue has the following
traits:

- follows an [issue template](.github/ISSUE_TEMPLATE)
- is [labeled](#labels) appropriately
- contains a well-written summary of the feature, bug, or problem statement
- contains a minimal, inlined code example (if applicable)
- includes links to prior discussion if you've found any

[1]: https://www.atlassian.com/software/jira
[2]: https://github.com/typicode/husky
[3]: https://www.conventionalcommits.org
[4]: https://github.com/conventional-changelog/commitlint
[5]: https://prettier.io
[6]: https://eslint.org
[7]: https://jsdoc.app
[8]: https://github.com/gajus/eslint-plugin-jsdoc
[9]: https://jestjs.io
[10]: https://jestjs.io/docs/api#describeskipname-fn
[11]: https://jestjs.io/docs/api#testskipname-fn
