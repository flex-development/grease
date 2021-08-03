import type { ValidationOptions } from 'class-validator'

/**
 * @file Interfaces - IsPathOptions
 * @module grease/interfaces/IsPathOptions
 */

/**
 * Validation options for the `IsPath` decorator.
 *
 * @extends ValidationOptions
 */
export interface IsPathOptions extends ValidationOptions {
  /**
   * If `true`, use `path.join` to prefix test value with `process.cwd()`.
   *
   * @default false
   */
  cwd?: boolean

  /**
   * If `true`, check if path exists within file system.
   *
   * @default true
   */
  exists?: boolean

  /**
   * If `true`, treat value as GitHub release asset path and ignore possible
   * display label (e.g: `'/path/to/asset.zip#My display label'`).
   *
   * @default false
   */
  gh?: boolean
}
