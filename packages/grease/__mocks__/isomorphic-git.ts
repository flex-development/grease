import BRANCHES from '@grease/tests/fixtures/git-branches.fixture'
import COMMITS from '@grease/tests/fixtures/git-commit-shas.fixture'
import fs from 'fs'

/**
 * @file Node Module Mock - isomorphic-git
 * @module grease/tests/mocks/isomorphic-git
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/isomorphic-git/isomorphic-git
 */

export const currentBranch = jest.fn(async () => {
  const command = 'git rev-parse --abbrev-ref HEAD'
  const options = { silent: true }

  return jest.requireActual('shelljs').exec(command, options).toString()
})

export const listBranches = jest.fn(async ({ remote }) => {
  if (!remote) return BRANCHES.local
  if (remote === 'origin') return BRANCHES.remote
  return []
})

export const readCommit = jest.fn(async ({ oid }) => {
  if (COMMITS.includes(oid)) return true

  return jest
    .requireActual('isomorphic-git')
    .readCommit({ dir: process.cwd(), fs, oid })
})
