/**
 * @file Models - ChangelogInfile
 * @module grease/changelog/models/ChangelogInfile
 */

import { isFile } from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { DOT, type Stringafiable } from '@flex-development/tutils'
import fs from 'node:fs'

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
}

export default ChangelogInfile
