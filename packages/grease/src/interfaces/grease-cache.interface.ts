import type { ObjectPlain } from '@flex-development/tutils'
import type { GitSemverTagsOptions } from '@grease/types'
import type { IGreaseOptions } from './grease-options.interface'

/**
 * @file Interfaces - IGreaseCache
 * @module grease/interfaces/IGreaseCache
 */

/**
 * `IGreaseCache` interface.
 */
export interface IGreaseCache {
  options: IGreaseOptions

  get git(): GitSemverTagsOptions
  setOptions(args: IGreaseOptions | ObjectPlain): Promise<IGreaseOptions>
}
