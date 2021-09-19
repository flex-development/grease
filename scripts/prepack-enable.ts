import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import logger from '@grease/utils/logger.util'
import type { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'
import replace from 'replace-in-file'

/**
 * @file Scripts - Prepack Enable
 * @module scripts/prepack-enable
 * @see https://github.com/adamreisnz/replace-in-file
 */

/**
 * @property {ReplaceInFileConfig} OPTIONS - Enable prepack options
 * @see https://github.com/adamreisnz/replace-in-file#custom-regular-expressions
 * @see https://github.com/adamreisnz/replace-in-file#replace-all-occurrences
 */
const OPTIONS: ReplaceInFileConfig = {
  files: [`${process.cwd()}/package.json`],
  from: '"_prepack":',
  to: '"prepack":'
}

/**
 * Enables `prepack` scripts.
 *
 * @see https://github.com/adamreisnz/replace-in-file
 *
 * @return {ReplaceResult[]} Replacement results
 */
const prepackEnable = (): ReplaceResult[] => {
  let results: ReplaceResult[] = []

  try {
    results = replace.sync(OPTIONS)
  } catch (error) {
    logger({}, (error as Error).message, [], LogLevel.ERROR)
  }

  logger({}, 'enable prepack script')
  return results
}

export default prepackEnable
