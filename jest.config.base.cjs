const { Config } = require('@jest/types')
const { parse } = require('comment-json')
const fs = require('fs-extra')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

/**
 * @file Jest Configuration - Base
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest/
 */

const TSCONFIG = `${process.env.PROJECT_CWD}/tsconfig.json`
const { compilerOptions } = parse(fs.readFileSync(TSCONFIG).toString())

const NODE_MODULES = process.env.NODE_MODULES
const TYPE = 'e2e|functional|integration'
const prefix = '<rootDir>'

/** @type {Config.InitialOptions} */
const config = {
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true
    }
  },
  moduleDirectories: [NODE_MODULES],
  moduleFileExtensions: ['cjs', 'js', 'json', 'mjs', 'node', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
  preset: 'ts-jest/presets/js-with-ts-esm',
  prettierPath: `<rootDir>/${NODE_MODULES}/prettier`,
  reporters: ['default', 'jest-github-reporter'],
  resolver: '<rootDir>/tools/loaders/package-resolver.cjs',
  rootDir: '../..',
  roots: ['<rootDir>/__mocks__', '<rootDir>/packages'],
  setupFiles: ['<rootDir>/__tests__/config/setup.ts'],
  setupFilesAfterEnv: [
    'jest-mock-console/dist/setupTestFramework.js',
    '<rootDir>/__tests__/config/setupAfterEnv.ts'
  ],
  testRegex: `(/__tests__/)(spec/(${TYPE}))?(.*)(${TYPE})?.spec.ts$`,
  testRunner: 'jest-jasmine2',
  transformIgnorePatterns: [],
  verbose: true
}

module.exports = config
