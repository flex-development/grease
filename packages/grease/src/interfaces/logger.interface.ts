import ch from 'chalk'
import figures from 'figures'
import type { IGreaseCache } from './grease-cache.interface'

/**
 * @file Interfaces - ILogger
 * @module grease/interfaces/ILogger
 */

/**
 * `Logger` service interface.
 */
export interface ILogger {
  readonly cache: IGreaseCache
  readonly ch: typeof ch

  checkpoint: (
    msg?: string,
    args?: any[],
    figure?: keyof typeof figures | string
  ) => void
  debug: (...args: any[]) => void
  error: (...text: unknown[]) => void
}
