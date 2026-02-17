/**
 * @file Internal - withTrailingSlash
 * @module grease-util-config/internal/withTrailingSlash
 */

import type { ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'

export default withTrailingSlash

/**
 * Ensure a URL or string ends with a single trailing slash.
 *
 * @see {@linkcode ModuleId}
 *
 * @internal
 *
 * @template {ModuleId} T
 *  The value
 *
 * @this {void}
 *
 * @param {T} value
 *  The string or URL
 * @return {T}
 *  The `value`
 */
function withTrailingSlash<T extends ModuleId>(value: T): T

/**
 * Ensure a URL or string ends with a single trailing slash.
 *
 * @see {@linkcode ModuleId}
 *
 * @internal
 *
 * @this {void}
 *
 * @param {ModuleId} value
 *  The string or URL
 * @return {ModuleId}
 *  The `value`
 */
function withTrailingSlash(value: ModuleId): ModuleId {
  if (typeof value === 'string') {
    value = value.replace(/[/\\]+$/, '') + pathe.sep
  } else {
    value.href = withTrailingSlash(value.href)
  }

  return value
}
