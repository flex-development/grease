import type { IGreaseCache } from '@grease/interfaces'
import GreaseCache from '@grease/services/grease-cache.service'
import { Container } from 'typedi'

/**
 * @file Configuration - Application Cache
 * @module grease/config/cache
 * @see https://github.com/typestack/typedi
 */

export default Container.get<IGreaseCache>(GreaseCache)
