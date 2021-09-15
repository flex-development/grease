import type { Config } from '@jest/types'
import { jsWithTsESM as preset } from 'ts-jest/presets'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import NODE_MODULES from './scripts/nm-string'
import { compilerOptions } from './tsconfig.json'

/**
 * @file Jest Configuration - Base
 * @see https://jestjs.io/docs/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest
 */

const TYPE = 'e2e|functional|integration'
const prefix = '<rootDir>'

const config: Config.InitialOptions = {
  ...preset,
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true
    }
  },
  moduleDirectories: [NODE_MODULES],
  moduleFileExtensions: ['node', 'js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
  prettierPath: `<rootDir>/${NODE_MODULES}/prettier`,
  reporters: ['default', 'jest-github-reporter'],
  rootDir: '../..',
  roots: ['<rootDir>/__mocks__', '<rootDir>/packages'],
  setupFiles: ['<rootDir>/__tests__/config/setup.ts'],
  setupFilesAfterEnv: [
    'jest-mock-console/dist/setupTestFramework.js',
    '<rootDir>/__tests__/config/setupAfterEnv.ts'
  ],
  testRegex: `(/__tests__/)(spec/(${TYPE}))?(.*)(${TYPE})?.spec.ts$`,
  verbose: true
}

export default config
