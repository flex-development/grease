/**
 * @file readConfig
 * @module grease-util-config/lib/readConfig
 */

import withTrailingSlash from '#internal/with-trailing-slash'
import defineConfig from '#lib/define-config'
import type { ReadConfigOptions } from '@flex-development/grease-util-config'
import { configExtensions } from '@flex-development/grease-util-symbol'
import type {
  List,
  ResolvedUserConfig
} from '@flex-development/grease-util-types'
import type {
  Condition,
  MainField,
  ModuleId,
  ResolveModuleOptions
} from '@flex-development/mlly'
import * as mlly from '@flex-development/mlly'
import type { JsonValue } from '@flex-development/tutils'
import json5 from 'json5'
import stripBom from 'strip-bom'

/**
 * Read a configuration file.
 *
 * @see {@linkcode ModuleId}
 * @see {@linkcode ReadConfigOptions}
 * @see {@linkcode ResolvedUserConfig}
 *
 * @async
 *
 * @this {void}
 *
 * @param {ModuleId} id
 *  The module id or specifier of the config file
 * @param {ReadConfigOptions | null | undefined} [options]
 *  Read options
 * @return {Promise<ResolvedUserConfig>}
 *  The resolved configuration
 */
async function readConfig(
  this: void,
  id: ModuleId,
  options?: ReadConfigOptions | null | undefined
): Promise<ResolvedUserConfig> {
  id = String(id)

  /**
   * The URL of the current working directory.
   *
   * @const {URL} cwd
   */
  const cwd: URL = withTrailingSlash(mlly.toUrl(options?.cwd ?? mlly.cwd()))

  /**
   * The URL of the parent module.
   *
   * @const {ModuleId} parent
   */
  const parent: ModuleId = options?.parent ?? cwd

  /**
   * Options for module resolution.
   *
   * @const {ResolveModuleOptions} resolveOptions
   */
  const resolveOptions: ResolveModuleOptions = {
    ...options,
    conditions: options?.conditions as List<Condition> | null | undefined,
    extensions: configExtensions,
    mainFields: options?.mainFields as List<MainField> | null | undefined
  }

  /**
   * The URL of the config file.
   *
   * @var {URL | undefined} url
   */
  let url: URL | undefined

  // try resolving the config file url.
  try {
    url = await mlly.resolveModule(id, parent, resolveOptions)
  } catch (e: unknown) { // try resolving `id` as relative specifier.
    if (
      mlly.isBareSpecifier(id) &&
      !id.startsWith('@') &&
      !mlly.isImportsSubpath(id) &&
      !mlly.canParseUrl(id)
    ) {
      try {
        url = await mlly.resolveModule('./' + id, parent, resolveOptions)
      } catch {
        // swallow second attempt error.
      }
    }

    if (!url) throw e
  }

  // read json config file.
  if (/\.json[5c]?$/.test(url.href) && /^(?:file|https?):/.test(url.protocol)) {
    /**
     * The config file contents.
     *
     * @const {string} contents
     */
    const contents: string = await mlly.getSource(url, {
      ...options,
      encoding: 'utf8'
    })

    /**
     * The parsed config file.
     *
     * @const {JsonValue} parsed
     */
    const parsed: JsonValue = json5.parse(stripBom(contents.trim() || 'null'))

    if (!url.href.endsWith('/package.json')) {
      return { config: defineConfig(parsed), url }
    }

    // handle package manifest config.
    if (parsed && typeof parsed === 'object' && 'grease' in parsed) {
      return { config: defineConfig(parsed['grease']), url }
    }
  } else {
    /**
     * The import attributes to apply when importing the config file.
     *
     * @const {ImportAttributes} importAttributes
     */
    const importAttributes: ImportAttributes = { ...options?.importAttributes }

    /**
     * The config module.
     *
     * @const {unknown} module
     */
    const module: unknown = await import(url.href, { with: importAttributes })

    if (module && typeof module === 'object' && 'default' in module) {
      return { config: defineConfig(module.default), url }
    }
  }

  return { config: {}, url }
}

export default readConfig
