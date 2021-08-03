import { mockGitTags } from '@tests/utils'

/**
 * @file User Module Mock - semver
 * @module utils/mocks/semver
 * @see https://jestjs.io/docs/manual-mocks#mocking-user-modules
 */

const semver = jest.requireActual('../semver').default

export default {
  clean: jest.fn((...args) => semver.clean(...args)),
  cmp: jest.fn((...args) => semver.cmp(...args)),
  coerce: jest.fn((...args) => semver.coerce(...args)),
  satisfies: jest.fn((...args) => semver.satisfies(...args)),
  tags: jest.fn((...args) => mockGitTags(...args)),
  valid: jest.fn((...args) => semver.valid(...args))
}
