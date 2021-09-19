import type { UpdaterCustom } from './UpdaterCustom'
import type { UpdaterJSON } from './UpdaterJSON'

/**
 * @file Type Definitions - Updater
 * @module grease/types/Updater
 */

/**
 * A resolved updater.
 */
export type Updater = {
  filename: string
  updater?: UpdaterCustom | UpdaterJSON
}
