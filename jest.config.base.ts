import type { Config } from '@jest/types'
import { jsWithTsESM as preset } from 'ts-jest/presets'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

/**
 * @file Jest Configuration - Base
 * @see https://jestjs.io/docs/next/configuration
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
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['node', 'js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
  prettierPath: `${prefix}/node_modules/prettier`,
  rootDir: '../..',
  roots: [`${prefix}/__mocks__`, `${prefix}/packages`],
  setupFiles: [`${prefix}/__tests__/config/setup.ts`],
  setupFilesAfterEnv: [`${prefix}/__tests__/config/setupAfterEnv.ts`],
  testRegex: `(/__tests__/)(spec/(${TYPE}))?(.*)(${TYPE})?.spec.ts$`,
  verbose: true
}

export default config
