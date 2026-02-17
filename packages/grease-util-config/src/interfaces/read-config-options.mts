/**
 * @file Interfaces - ReadConfigOptions
 * @module grease-util-config/interfaces/ReadConfigOptions
 */

import type { List } from '@flex-development/grease-util-types'
import type {
  ModuleId,
  ResolveModuleOptions
} from '@flex-development/mlly'

/**
 * Union of ignored or overridden fields.
 *
 * @internal
 */
type Skip = 'conditions' | 'extensions' | 'mainFields'

/**
 * Options for reading a config file.
 *
 * @see {@linkcode ResolveModuleOptions}
 *
 * @extends {Omit<ResolveModuleOptions, Skip>}
 */
interface ReadConfigOptions extends Omit<ResolveModuleOptions, Skip> {
  /**
   * The list of export/import conditions.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode List}
   * @see https://nodejs.org/api/packages.html#conditional-exports
   *
   * @default mlly.defaultConditions
   */
  conditions?: List<string> | null | undefined

  /**
   * The module id of the current working directory.
   *
   * > 👉 **Note**: Paths will be converted to {@linkcode URL}s.
   *
   * @see {@linkcode ModuleId}
   */
  cwd?: ModuleId | null | undefined

  /**
   * The import attributes to apply.
   *
   * @see {@linkcode ImportAttributes}
   */
  importAttributes?: ImportAttributes | null | undefined

  /**
   * The list of legacy `main` fields.
   *
   * > 👉 **Note**: Should be sorted by priority.
   *
   * @see {@linkcode List}
   *
   * @default mlly.defaultMainFields
   */
  mainFields?: List<string> | null | undefined

  /**
   * The URL of the parent module.
   *
   * @see {@linkcode ModuleId}
   */
  parent?: ModuleId | null | undefined

  /**
   * Request options for JSON network based modules.
   *
   * @see {@linkcode RequestInit}
   */
  req?: RequestInit | null | undefined
}

export type { ReadConfigOptions as default, Skip }
