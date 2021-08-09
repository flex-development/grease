import type { ILogger } from '@grease/interfaces'

/**
 * @file User Module Mock - logger
 * @module config/mocks/logger
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-user-modules
 */

const mockLogger = jest.requireActual('../logger.config').default as ILogger

mockLogger.checkpoint = jest.fn()
mockLogger.debug = jest.fn()
mockLogger.error = jest.fn()

export default mockLogger
