import type { Config } from '@jest/types'
import merge from 'lodash/merge'
import baseConfig from '../../jest.config.base'
import pkg from './package.json'

/**
 * @file Jest Project Configuration
 * @see https://jestjs.io/docs/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest/
 */

const ROOT = `<rootDir>/${pkg.repository.directory}`

const config: Config.InitialOptions = merge(baseConfig, {
  displayName: pkg.name.split('/')[1],
  globals: {
    'ts-jest': {
      tsconfig: `${ROOT}/tsconfig.json`
    }
  },
  roots: ['<rootDir>/__mocks__', ROOT],
  setupFiles: [
    '<rootDir>/__tests__/config/setup.ts',
    '<rootDir>/__tests__/config/setup.grease.ts'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/__tests__/config/setupAfterEnv.ts',
    '<rootDir>/__tests__/config/setupAfterEnv.grease.ts'
  ],
  testEnvironment: 'node'
})

export default config
