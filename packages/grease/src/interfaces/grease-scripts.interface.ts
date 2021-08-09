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
   * Executed **after** the `depchecker` lifecycle.
   */
  postdepchecker?: string

  /**
   * Executed **after** the `greaser` lifecycle.
   */
  postgreaser?: string

  /**
   * Executed **after** the `notes` lifecycle.
   */
  postnotes?: string

  /**
   * Executed **before** the `depchecker` lifecycle.
   */
  predepchecker?: string

  /**
   * Executed **before** the `greaser` lifecycle.
   */
  pregreaser?: string

  /**
   * Executed **before** the `notes` lifecycle.
   */
  prenotes?: string
}
