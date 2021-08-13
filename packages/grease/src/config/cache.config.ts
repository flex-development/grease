import type { IGreaseCache } from '@grease/interfaces'
import Container from './container.config'
import TOKENS from './tokens.config'

/**
 * @file Configuration - Application Cache
 * @module grease/config/cache
 */

export default Container.get<IGreaseCache>(TOKENS.GreaseCache)
