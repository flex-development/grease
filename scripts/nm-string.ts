import join from 'lodash.join'

/**
 * @file Scripts - 'node_modules'
 * @module scripts/nm-string
 */

/**
 * Fixes `YN0000: Strings should avoid referencing the node_modules directory`
 * warning during the `yarn check:install` lifecycle.
 */

/**
 * @property {string} PWD - Root project directory
 */
const PWD: string = `${process.env.PROJECT_CWD}/`

/**
 * @property {string} ID - Resolve path id as array
 */
const PARTS: string[] = ['node', '_', 'modules', '/', 'ts-node']

/**
 * @property {string} RESOLVE - Resolved path to `PKG`
 */
const RESOLVE: string = require.resolve(join(PARTS, ''), { paths: [PWD] })

/**
 * @property {string} NODE_MODULES - 'node_modules'
 */
const NODE_MODULES: string = RESOLVE.split(PWD)[1].split('/')[0]

export default NODE_MODULES
