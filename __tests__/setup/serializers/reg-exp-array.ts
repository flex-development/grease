/**
 * @file Snapshot Serializers - RegExpArray
 * @module tests/setup/serializers/reg-exp-array
 */

import type { RegExpArray } from '#tests/types'
import {
  get,
  isArray,
  isNumber,
  isObjectPlain,
  isString,
  omit,
  type Fn
} from '@flex-development/tutils'

expect.addSnapshotSerializer({
  /**
   * Get a `value` snapshot.
   *
   * @param {unknown} value - Value to print
   * @param {Fn<[unknown], string>} printer - Print function
   * @return {string} `value` as printable string
   */
  print(value: unknown, printer: Fn<[unknown], string>): string {
    return printer(omit(value, ['index', 'input']))
  },
  /**
   * Check if `value` is a {@linkcode RegExpArray}.
   *
   * @param {unknown} value - Value to check
   * @return {value is RegExpArray} `true` if `value` is a `RegExpArray`
   */
  test(value: unknown): value is RegExpArray {
    return (
      isArray(value) &&
      isObjectPlain(get(value, 'groups')) &&
      isNumber(get(value, 'index')) &&
      isString(get(value, 'input'))
    )
  }
})
