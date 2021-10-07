const { Config } = require('@jest/types')
const baseConfig = require('../../jest.config.base.cjs')
const { name, repository } = require('./package.json')

/**
 * @file Jest Configuration - Workspace
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest
 */

const ROOT = `<rootDir>/${repository.directory}`

/** @type {Config.InitialOptions} */
const config = {
  ...baseConfig,
  displayName: name.split('/')[1],
  globals: {
    'ts-jest': {
      tsconfig: `${ROOT}/tsconfig.json`
    }
  },
  roots: ['<rootDir>/__mocks__', ROOT],
  setupFiles: [`${ROOT}/__tests__/config/setup.ts`],
  setupFilesAfterEnv: [`${ROOT}/__tests__/config/setupAfterEnv.ts`]
}

module.exports = config
