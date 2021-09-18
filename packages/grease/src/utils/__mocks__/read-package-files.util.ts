import VERSIONS from '@grease/tests/fixtures/changelog-versions.fixture'

/**
 * @file User Module Mock - readPackageFiles
 * @module config/mocks/readPackageFiles
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

export default jest.fn().mockReturnValue({
  isPrivate: false,
  version: VERSIONS[0]
})
