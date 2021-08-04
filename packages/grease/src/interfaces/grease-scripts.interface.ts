import type { StandardVersionOptions } from '@grease/types'

/**
 * @file Interfaces - IGreaseScripts
 * @module grease/interfaces/IGreaseScripts
 */

/**
 * Map containing scripts to execute before and/or lifecycle events.
 *
 * @extends StandardVersionOptions.Scripts
 */
export interface IGreaseScripts extends StandardVersionOptions.Scripts {
  /**
   * Executed **after** the `greaser` lifecycle.
   */
  postgreaser?: string

  /**
   * Executed **after** the `grease-notes` lifecycle.
   */
  postnotes?: string

  /**
   * Executed **before** the `greaser` lifecycle.
   */
  pregreaser?: string

  /**
   * Executed **before** the `grease-notes` lifecycle.
   */
  prenotes?: string
}
