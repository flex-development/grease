/**
 * @file Providers - ConfigService
 * @module grease/config/providers/ConfigService
 */

import pkg from '#pkg' assert { type: 'json' }
import type { IGreaseConfig } from '#src/config/interfaces'
import { GreaseConfig } from '#src/config/models'
import type { Commit } from '#src/git'
import { LoggerService } from '#src/log'
import { ValidationService } from '#src/providers'
import {
  ERR_MODULE_NOT_FOUND,
  ERR_UNKNOWN_FILE_EXTENSION,
  ERR_UNSUPPORTED_DIR_IMPORT,
  type NodeError
} from '@flex-development/errnode'
import type {
  Result as MkbuildResult,
  OutputExtension
} from '@flex-development/mkbuild'
import * as mlly from '@flex-development/mlly'
import * as pathe from '@flex-development/pathe'
import {
  DOT,
  cast,
  define,
  get,
  join,
  merge,
  omit,
  template,
  type EmptyObject,
  type Merge
} from '@flex-development/tutils'
import { Injectable } from '@nestjs/common'
import fg from 'fast-glob'
import json5 from 'json5'

/**
 * Grease configuration provider.
 *
 * @class
 */
@Injectable()
class ConfigService {
  /**
   * Configuration name.
   *
   * @public
   * @static
   * @readonly
   * @member {string} NAME
   */
  public static readonly NAME: string = pkg.name.replace(/.*\//, '')

  /**
   * Create a new configuration service.
   *
   * @see {@linkcode LoggerService}
   * @see {@linkcode ValidationService}
   *
   * @param {LoggerService} logger - Logger service
   * @param {ValidationService} validator - Validation service
   */
  constructor(
    protected readonly logger: LoggerService,
    protected readonly validator: ValidationService
  ) {
    this.logger = logger.withTag('config')
  }

  /**
   * Get the search pattern for config files.
   *
   * Supported file basenames:
   *
   * - `.grease`
   * - `.greaserc`
   * - `grease.config`
   *
   * Supported file extensions:
   *
   * - `.js`
   * - `.json`
   * - `.json5`
   * - `.jsonc`
   * - `.mjs`
   * - `.mts`
   * - `.ts`
   *
   * @protected
   * @static
   *
   * @return {string} Config file search pattern
   */
  protected static get SEARCH_PATTERN(): string {
    /**
     * Config file extensions.
     *
     * @const {string[]} exts
     */
    const exts: string[] = ['js', 'json', 'json5', 'jsonc', 'mjs', 'mts', 'ts']

    return template('{.{name},.{name}rc,{name}.config}.+({exts})', {
      exts: join(exts, '|'),
      name: ConfigService.NAME
    })
  }

  /**
   * Load a configuration file.
   *
   * @public
   * @async
   *
   * @template T - Parsed commit type
   *
   * @param {string} file - Path to config file
   * @param {IGreaseConfig<T>?} [opts={}] - Configuration overrides
   * @return {Promise<GreaseConfig<T>>} Validated configuration object
   * @throws {NodeError} If loading fails
   */
  public async load<T extends Commit = Commit>(
    file: string,
    opts: IGreaseConfig<T> = {}
  ): Promise<EmptyObject | GreaseConfig<T>> {
    this.logger.sync(opts)

    switch (true) {
      case opts.config === false:
        this.logger.verbose('load skipped')
        break
      case mlly.isFile(file):
        /**
         * URL of configuration file.
         *
         * @const {URL} url
         */
        const url: URL = mlly.toURL(file)

        /**
         * Config file extension.
         *
         * @const {string} ext
         */
        const ext: string = pathe.extname(url.href)

        /**
         * User configuration object.
         *
         * @var {IGreaseConfig<T>} config
         */
        let config: IGreaseConfig<T> = {}

        /**
         * Config file source content.
         *
         * @const {string} source
         */
        let source: string = <string>await mlly.getSource(url)

        // log load start
        this.logger.verbose(url.pathname)

        // parse config source based on extension
        switch (ext) {
          case '.json':
          case '.json5':
          case '.jsonc':
            config = json5.parse(source)
            break
          case '.js':
          case '.mjs':
            source = await mlly.resolveModules(source, { parent: url })
            config = get(await import(mlly.toDataURL(source)), 'default', {})
            break
          case '.mts':
          case '.ts':
            const { default: make } = await import('@flex-development/mkbuild')

            const [result] = <[MkbuildResult]>(await make({
              clean: false,
              configfile: false,
              cwd: pathe.dirname(file),
              dts: false,
              ext: cast<OutputExtension>(ext),
              format: 'esm',
              keepNames: true,
              pattern: pathe.basename(file),
              platform: 'node',
              source: DOT,
              write: false
            }))

            source = get(result, 'outputs.0.text')
            source = await mlly.resolveModules(source, { parent: url })
            config = get(await import(mlly.toDataURL(source)), 'default', {})
            break
          default:
            this.logger.fail('invalid extension', this.logger.colors.bold(ext))

            /**
             * Configuration loading error.
             *
             * @const {NodeError} error
             */
            const error: NodeError = new ERR_UNKNOWN_FILE_EXTENSION(ext, file)

            this.logger.trace(error)
            throw error
        }

        config = new GreaseConfig(this.merge(config, opts))
        this.logger.verbose(config)
        return this.validator.validate<GreaseConfig<T>>(cast(config))
      default:
        this.logger.fail('invalid config', this.logger.colors.bold(file))

        /**
         * Configuration loading error.
         *
         * @const {NodeError} error
         */
        const error: NodeError = mlly.isDirectory(file)
          ? new ERR_UNSUPPORTED_DIR_IMPORT(file, import.meta.url)
          : new ERR_MODULE_NOT_FOUND(file, import.meta.url, 'module')

        this.logger.trace(error)
        throw error
    }

    return {}
  }

  /**
   * Merge configuration objects.
   *
   * @see {@linkcode IGreaseConfig}
   *
   * @protected
   *
   * @template T - Configuration object type
   * @template U - Configuration overrides type
   *
   * @param {T} config - Configuration object
   * @param {U?} [opts={}] - Configuration overrides
   * @return {Merge<T, [U]>} Merged configuration object
   */
  protected merge<
    T extends IGreaseConfig = IGreaseConfig,
    U extends IGreaseConfig = IGreaseConfig
  >(config: T, opts: U = <U>{}): Merge<T, [U]> {
    config.changelog = merge({ ...config.changelog }, { ...opts.changelog })
    return merge<T, [U]>(config, <U>omit(opts, ['changelog']))
  }

  /**
   * Search for a configuration object.
   *
   * @see {@linkcode GreaseConfig}
   * @see {@linkcode IGreaseConfig}
   *
   * @public
   * @async
   *
   * @template T - Parsed commit type
   *
   * @param {IGreaseConfig<T>?} [opts={}] - Configuration overrides
   * @return {Promise<EmptyObject | GreaseConfig<T>>} Configuration options
   */
  public async search<T extends Commit = Commit>(
    opts: IGreaseConfig<T> = {}
  ): Promise<EmptyObject | GreaseConfig<T>> {
    const [file = ''] = await fg(ConfigService.SEARCH_PATTERN, opts)

    !file && define(opts, 'config', { value: false })
    return this.load(pathe.resolve(get(opts, 'cwd', ''), file), opts)
  }
}

export default ConfigService
