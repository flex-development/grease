/**
 * @file Type Definitions - ValidatorOptions
 * @module grease/types/ValidatorOptions
 */

/**
 * Validation service options.
 */
type ValidatorOptions = {
  /**
   * Print extra warning messages when something is not right.
   *
   * @default false
   */
  debug?: boolean

  /**
   * Indicate if target should be exposed in `ValidationError`.
   *
   * @default false
   */
  target?: boolean

  /**
   * Indicate if validated value should be exposed in `ValidationError`.
   *
   * @default true
   */
  value?: boolean
}

export type { ValidatorOptions as default }
