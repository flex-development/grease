/**
 * @file Fixtures - .grease.ts
 * @module fixtures/pkg/prerelease/config
 */

import type { IGreaseConfig } from '@flex-development/grease'

/**
 * Grease configuration object.
 *
 * @const {IGreaseConfig} config
 */
const config: IGreaseConfig = {
  cwd: '__fixtures__/pkg/prerelease',
  debug: true,
  tagprefix: 'pkg-prerelease@'
}

export default config
