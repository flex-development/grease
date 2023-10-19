/**
 * @file Models - AbstractManifest
 * @module grease/models/AbstractManifest
 */

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
   * @abstract
   * @instance
   * @member {string} dir
   */
  public abstract dir: string

  /**
   * Create a new manifest.
   *
   * @param {string?} [cwd=DOT] - Absolute path to current working directory
   */
  constructor(cwd: string = DOT) {
    void cwd
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
   * Get `this` manifest filename.
   *
   * @public
   * @abstract
   *
   * @return {string} `this` filename
   */
  public abstract get filename(): string

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
