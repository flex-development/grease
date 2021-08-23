import type { PackageJson } from 'read-pkg'
import read from 'read-pkg'

/**
 * @file Script Utility - Get Package Data
 * @module scripts/utils/pkg-get
 */

/**
 * Returns `package.json` data.
 *
 * @param {string} [cwd=process.cwd()] - Current working directory
 * @return {PackageJson} `package.json` data
 */
const pkg = (cwd: string = process.cwd()): PackageJson => {
  const data = read.sync({ cwd, normalize: false })

  return { ...data, _id: `${data.name}@${data.version}` }
}

/**
 * @property {string} $name - Name of NPM package
 */
export const $name: string = pkg().name as string

/**
 * @property {string} name_no_scope - Package name without scope
 */
export const $name_no_scope: string = $name.split('/')[1]

/**
 * @property {string} $version - Package version
 */
export const $version: string = pkg().version as string

export default pkg
