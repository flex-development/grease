/**
 * @file Test Utilities
 * @module tests/utils
 */

/**
 * Returns the `typeof value`.
 *
 * If `value` is a object, the constructor name will be returned.
 *
 * @param {any} value - Value to stringify type
 * @return {string} Value type as string
 */
export const stringifyType = (value: any): string => {
  const obj = typeof value === 'object' && (value?.constructor ?? false)
  return `${obj ? value.constructor.name : typeof value}`
}
