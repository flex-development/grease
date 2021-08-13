import type { ValidationOptions } from 'class-validator'

/**
 * @file Interfaces - IsCommitOptions
 * @module interfaces/IsCommitOptions
 */

/**
 * Validation options for the `IsCommit` decorator.
 *
 * @extends ValidationOptions
 */
export interface IsCommitOptions extends ValidationOptions {
  /**
   * `.git` directory.
   *
   * @default process.env.PWD
   */
  dir?: string
}
