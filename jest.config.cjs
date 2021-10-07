const { Config } = require('@jest/types')
const omit = require('lodash.omit')
const baseConfig = require('./jest.config.base.cjs')
const { name, workspaces } = require('./package.json')

/**
 * @file Jest Configuration - Root
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest
 */

/** @type {Config.InitialOptions} */
const config = {
  ...omit(baseConfig, ['rootDir']),
  displayName: name.split('/')[1],
  projects: workspaces.map(glob => `<rootDir>/${glob}/jest.config.cjs`)
}

module.exports = config