import GreaseCache from '@grease/services/grease-cache.service'
import getGlobal from '@grease/utils/get-global.util'
import { DEBUG_NAMESPACE } from './constants.config'

/**
 * @file Configuration - Application Cache
 * @module grease/config/cache
 */

/**
 * Returns the application cache. The cache follows best practices and stores
 * metadata in a global variable.
 *
 * @return {GreaseCache} Application cache
 */
export function getGreaseCache(): GreaseCache {
  const global = getGlobal()

  if (!global[DEBUG_NAMESPACE]) global[DEBUG_NAMESPACE] = new GreaseCache()

  return global[DEBUG_NAMESPACE]
}

export default getGreaseCache()
