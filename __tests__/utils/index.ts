/**
 * @file Test Utilities
 * @module tests/utils
 */

/**
 * Compares two string values.
 *
 * @param {string} string1 - First string to compare
 * @param {string} string2 - Second string to compare
 * @param {'asc' | 'desc'} [type] - Sort type
 * @return {number} Comparison result, `-1 | 0 | 1`
 */
export const stringCompare = (
  string1: string,
  string2: string,
  type: 'asc' | 'desc' = 'asc'
): -1 | 0 | 1 => {
  const ascending = type === 'asc'

  if (string1 < string2) return ascending ? -1 : 1
  if (string1 > string2) return ascending ? 1 : -1

  return 0
}

/**
 * Returns the `typeof value`. If `value` is a object, the constructor name will
 * be returned.
 *
 * @param {any} value - Value to stringify type
 * @return {string} Value type as string
 */
export const stringifyType = (value: any): string => {
  const obj = typeof value === 'object' && (value?.constructor ?? false)
  return `${obj ? value.constructor.name : typeof value}`
}
