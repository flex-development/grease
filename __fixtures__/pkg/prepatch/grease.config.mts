/**
 * @file Fixtures - grease.config.mts
 * @module fixtures/pkg/prepatch/config
 */

import type { IGreaseConfig } from '@flex-development/grease'

/**
 * Grease configuration object.
 *
 * @const {IGreaseConfig} config
 */
const config: IGreaseConfig = {
  cwd: '__fixtures__/pkg/prepatch',
  debug: true,
  tagprefix: 'pkg-prepatch@'
}

export default config
