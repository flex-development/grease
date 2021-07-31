import type { Debugger } from 'debug'
import debug from 'debug'
import type { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'
import replace from 'replace-in-file'

/**
 * @file Scripts - Fix Node Module Import Paths
 * @module scripts/fix-node-module-paths
 * @see https://github.com/adamreisnz/replace-in-file
 */

/**
 * @property {Debugger} logger - Debug logger
 */
const logger: Debugger = debug('scripts').extend('fix-node-module-paths')

/**
 * @see https://github.com/adamreisnz/replace-in-file#custom-regular-expressions
 * @see https://github.com/adamreisnz/replace-in-file#replace-all-occurrences
 * @property {ReplaceInFileConfig} OPTIONS - Replacement options
 */
const OPTIONS: ReplaceInFileConfig = {
  files: 'build/**/*',
  from: new RegExp('(../.*)?(node_modules/)', 'g'),
  to: ''
}

/**
 * Fixes all import paths that include the pattern `'node_modules'`.
 *
 * When using TypeScript `path` aliases, the pattern `'node_modules'` may
 * erroneously included in import paths. This is particularly an issue when
 * publishing packages.
 *
 * @see @link https://github.com/adamreisnz/replace-in-file
 *
 * @return {ReplaceResult[]} Replacement results
 */
const fixNodeModulePaths = (): ReplaceResult[] => {
  let results: ReplaceResult[] = []

  try {
    results = replace.sync(OPTIONS)
  } catch (error) {
    logger('%O', error)
  }

  console.log('✓ fix import paths')
  return results
}

export default fixNodeModulePaths
