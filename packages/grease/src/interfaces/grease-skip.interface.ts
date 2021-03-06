import type { StandardVersionOptions } from '@grease/types'

/**
 * @file Interfaces - IGreaseSkip
 * @module grease/interfaces/IGreaseSkip
 */

/**
 * Map of lifecycles that should be skipped.
 *
 * @extends StandardVersionOptions.Skip
 */
export interface IGreaseSkip extends StandardVersionOptions.Skip {
  /**
   * Skip `depchecker` lifecycle.
   *
   * If skipped, the `greaser` lifecycle will be skipped as well.
   */
  depchecker?: boolean

  /**
   *  Skip `greaser` lifecycle.
   */
  greaser?: boolean

  /**
   * Skip `notes` lifecycle.
   */
  notes?: boolean
}
