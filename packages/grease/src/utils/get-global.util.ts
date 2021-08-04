import type { ObjectPlain } from '@flex-development/tutils'

/**
 * @file Utility - getGlobal
 * @module grease/utils/getGlobal
 */

/**
 * Returns the global object across Node and browsers.
 *
 * Note: `globalThis` is the standardized approach however it has been added
 * to Node.js in version 12. This function is necessary until Node 12 EOL.
 *
 * @return {ObjectPlain} Global object across Node and browsers
 */
function getGlobal(): ObjectPlain {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof global !== 'undefined') return global

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Cannot find name 'window'
  if (typeof window !== 'undefined') return window

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Cannot find name 'self'
  if (typeof self !== 'undefined') return self

  return {}
}

export default getGlobal
