import type { Config } from '@jest/types'
import baseConfig from '../../jest.config.base'
import pkg from './package.json'

/**
 * @file Jest Configuration - Workspace
 * @see https://jestjs.io/docs/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest
 */

const ROOT = `<rootDir>/${pkg.repository.directory}`

const config: Config.InitialOptions = {
  ...baseConfig,
  displayName: pkg.name.split('/')[1],
  globals: {
    'ts-jest': {
      tsconfig: `${ROOT}/tsconfig.json`
    }
  },
  roots: ['<rootDir>/__mocks__', ROOT],
  setupFiles: [`${ROOT}/__tests__/config/setup.ts`],
  setupFilesAfterEnv: [`${ROOT}/__tests__/config/setupAfterEnv.ts`]
}

export default config
