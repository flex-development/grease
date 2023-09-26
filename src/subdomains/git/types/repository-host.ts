/**
 * @file Type Definitions - RepositoryHost
 * @module grease/git/types/RepositoryHost
 */

import type { RepositoryProvider } from '#src/git/enums'
import type { Dot } from '@flex-development/tutils'

/**
 * Repository hostname.
 *
 * @see {@linkcode RepositoryProvider}
 *
 * @example
 *  'github.com'
 */
type RepositoryHost = `${RepositoryProvider}${Dot}${'com' | 'org'}`

export type { RepositoryHost as default }
