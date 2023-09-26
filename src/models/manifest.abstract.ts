/**
 * @file Models - AbstractManifest
 * @module grease/models/AbstractManifest
 */

import { isDirectory, toURL, type ModuleId } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { DOT } from '@flex-development/tutils'
import Version from './version.model'

/**
 * Abstract manifest file.
 *
 * @class
 * @abstract
 */
abstract class AbstractManifest {
  /**
   * Absolute path to manifest directory.
   *
   * @public
   * @instance
   * @member {string} dir
   */
  public dir: string

  /**
   * Manifest filename.
   *
   * @public
   * @abstract
   * @readonly
   * @instance
   * @member {string} filename
   */
  public abstract readonly filename: string

  /**
   * Create a new manifest.
   *
   * @param {ModuleId?} [dir=DOT] - Module id of manifest directory
   * @throws {Error} If manifest directory is not found
   */
  constructor(dir: ModuleId = DOT) {
    if (!isDirectory(this.dir = toURL(dir).pathname)) {
      throw new Error('manifest directory not found', {
        cause: { dir: this.dir }
      })
    }
  }

  /**
   * Get the absolute path to `this` manifest.
   *
   * @public
   *
   * @return {string} `this` filepath
   */
  public get file(): string {
    return pathe.join(this.dir, this.filename)
  }

  /**
   * Get `this` manifest version.
   *
   * @public
   * @abstract
   *
   * @return {Version} `this` manifest version
   */
  public abstract get version(): Version

  /**
   * Set `this` manifest version.
   *
   * @public
   * @abstract
   *
   * @param {Version} version - New manifest version
   */
  public abstract set version(version: Version)

  /**
   * Write manifest data to {@linkcode file}.
   *
   * @public
   * @abstract
   *
   * @return {Promise<this> | this} `this` manifest
   */
  public abstract write(): Promise<this> | this
}

export default AbstractManifest
