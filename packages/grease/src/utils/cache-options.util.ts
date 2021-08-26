import type { ObjectPlain } from '@flex-development/tutils'
import Container from '@grease/config/container.config'
import TOKENS from '@grease/config/tokens.config'
import type { IGreaseCache, IGreaseOptions } from '@grease/interfaces'
import GreaseOptions from '@grease/models/grease-options.model'
import validate from '@grease/utils/validate.util'

/**
 * @file Utility - cacheOptions
 * @module grease/utils/cacheOptions
 */

/**
 * Caches application options after validating.
 *
 * @async
 * @param {IGreaseOptions | ObjectPlain} [args={}] - Application options
 * @return {Promise<IGreaseOptions>} Promise containing validated options
 */
const cacheOptions = async (
  args: IGreaseOptions | ObjectPlain
): Promise<IGreaseOptions> => {
  const cache = Container.get<IGreaseCache>(TOKENS.GreaseCache)

  cache.options = await validate<IGreaseOptions>(GreaseOptions, args, false)

  return cache.options
}

export default cacheOptions
