import BRANCHES from '@tests/fixtures/git-branches.fixture'

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
