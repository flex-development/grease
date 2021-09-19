import { LogLevel } from '@flex-development/log/enums/log-level.enum'
import logger from '@grease/utils/logger.util'
import type { ReplaceInFileConfig, ReplaceResult } from 'replace-in-file'
import replace from 'replace-in-file'

/**
 * @file Scripts - Prepack Disable
 * @module scripts/prepack-disable
 * @see https://github.com/adamreisnz/replace-in-file
 */

/**
 * @property {ReplaceInFileConfig} OPTIONS - Disable prepack options
 * @see https://github.com/adamreisnz/replace-in-file#custom-regular-expressions
 * @see https://github.com/adamreisnz/replace-in-file#replace-all-occurrences
 */
const OPTIONS: ReplaceInFileConfig = {
  files: [`${process.cwd()}/package.json`],
  from: '"prepack":',
  to: '"_prepack":'
}

/**
 * Disables `prepack` scripts.
 *
 * @see https://github.com/adamreisnz/replace-in-file
 *
 * @return {ReplaceResult[]} Replacement results
 */
const prepackDisable = (): ReplaceResult[] => {
  let results: ReplaceResult[] = []

  try {
    results = replace.sync(OPTIONS)
  } catch (error) {
    logger({}, (error as Error).message, [], LogLevel.ERROR)
  }

  logger({}, 'disable prepack script')
  return results
}

export default prepackDisable
