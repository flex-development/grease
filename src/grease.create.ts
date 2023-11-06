/**
 * @file createGreaser
 * @module grease/create
 */

import { LoggerService, UserLogLevel } from '#src/log'
import type { INestApplicationContext as App } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import GreaseModule from './grease.module'
import GreaseService from './grease.service'

/**
 * Create a greaser.
 *
 * @see {@linkcode GreaseService}
 *
 * @async
 *
 * @return {Promise<GreaseService>} Grease runner instance
 */
const createGreaser = async (): Promise<GreaseService> => {
  /**
   * NestJS application context.
   *
   * @const {App} app
   */
  const app: App = await NestFactory.createApplicationContext(GreaseModule, {
    abortOnError: false,
    autoFlushLogs: false,
    bufferLogs: true
  })

  // use custom logger
  app.useLogger(app.get(LoggerService).withTag('nest'))
  app.useLogger([UserLogLevel.WARN])
  app.flushLogs()

  return (await app.init()).get(GreaseService)
}

export default createGreaser
