/**
 * @file Node Module Mock - runLifecycleScript
 * @module mocks/standard-version/lib/run-lifecycle-script
 * @see https://jestjs.io/docs/manual-mocks#mocking-node-modules
 * @see https://github.com/conventional-changelog/standard-version
 */

export default jest.fn((...args) => {
  const moduleName = 'standard-version/lib/run-lifecycle-script'
  return jest.requireActual(moduleName)(...args)
})
