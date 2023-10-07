/**
 * @file Models - ChangelogInfile
 * @module grease/changelog/models/ChangelogInfile
 */

import { isFile } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { DOT, merge, type Stringafiable } from '@flex-development/tutils'
import fs from 'node:fs'
import util from 'node:util'

/**
 * Changelog infile model.
 *
 * @class
 * @implements {Stringafiable}
 */
class ChangelogInfile implements Stringafiable {
  /**
   * Absolute path to infile.
   *
   * @public
   * @readonly
   * @instance
   * @member {string} path
   */
  public readonly path: string

  /**
   * Create a new changelog infile.
   *
   * @param {string?} [infile='CHANGELOG.md'] - Infile path or filename
   * @param {string?} [cwd=DOT] - Path to current working directory
   */
  constructor(infile: string = 'CHANGELOG.md', cwd: string = DOT) {
    if (!isFile(this.path = pathe.resolve(cwd, infile))) {
      throw new Error('invalid infile', { cause: { infile: this.path } })
    }
  }

  /**
   * Get infile content.
   *
   * @public
   *
   * @return {string} Changelog infile content
   */
  public toString(): string {
    return fs.readFileSync(this.path, 'utf8')
  }

  /**
   * Get a string representation of `this` to use with {@linkcode util.inspect}.
   *
   * @see https://nodejs.org/api/util.html#utilinspectcustom
   * @see https://nodejs.org/api/util.html#utilinspectobject-options
   *
   * @protected
   *
   * @param {number} depth - Number of times to recurse while formatting `this`
   * @param {util.InspectOptions} opts - Inspection options
   * @param {typeof util.inspect} inspect - {@linkcode util.inspect}
   * @return {string} String representation of `this` infile
   */
  protected [util.inspect.custom](
    depth: number,
    opts: util.InspectOptions,
    inspect: typeof util.inspect
  ): string {
    return inspect({ path: this.path }, merge(opts, <typeof opts>{
      breakLength: process.stdout.columns,
      maxStringLength: null
    }))
  }
}

export default ChangelogInfile
