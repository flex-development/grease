import type { Updater } from './Updater'
import type { UpdaterCustom } from './UpdaterCustom'

/**
 * @file Type Definitions - UpdaterResolver
 * @module grease/types/UpdaterResolver
 */

/**
 * Object used to resolve updaters.
 */
export type UpdaterResolver = {
  filename?: Updater['filename']
  type?: 'json' | 'plain-text'
  updater?: UpdaterCustom | string
}
