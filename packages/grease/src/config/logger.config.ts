import type { ILogger } from '@grease/interfaces'
import Logger from '@grease/services/logger.service'
import { Container } from 'typedi'

/**
 * @file Configuration - Logger
 * @module grease/config/logger
 * @see https://github.com/typestack/typedi
 */

export default Container.get<ILogger>(Logger)
