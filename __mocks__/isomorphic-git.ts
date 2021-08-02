import BRANCHES from '@tests/fixtures/git-branches.fixture'
import COMMITS from '@tests/fixtures/git-commit-shas.fixture'
import fs from 'fs'

/**
 * @file Node Module Mock - isomorphic-git
 * @module mocks/isomorphic-git
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/isomorphic-git/isomorphic-git
 */

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
